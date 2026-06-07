#!/usr/bin/env python3
"""One-shot color token refactor: define tokens + replace hardcoded values."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "src"

COLOR_RE = re.compile(
    r"#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b|rgba?\([^)]+\)"
)


def normalize_hex(value: str) -> str:
    v = value.lower()
    if not v.startswith("#"):
        return value
    h = v[1:]
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    return f"#{h}"


def parse_rgba(value: str) -> tuple[int, int, int, float] | None:
    m = re.match(r"rgba?\(\s*([^)]+)\s*\)", value, re.I)
    if not m:
        return None
    parts = [p.strip() for p in m.group(1).split(",")]
    if len(parts) == 3:
        r, g, b = (int(float(x)) for x in parts)
        a = 1.0
    else:
        r, g, b = (int(float(x)) for x in parts[:3])
        a = float(parts[3])
    return r, g, b, a


def canonical_color(value: str) -> str:
    if value.startswith("#"):
        return normalize_hex(value)
    parsed = parse_rgba(value)
    if not parsed:
        return value
    r, g, b, a = parsed
    if a == 1.0 and value.lower().startswith("rgb("):
        return f"rgb({r}, {g}, {b})"
    return f"rgba({r}, {g}, {b}, {a})"


def token_name(value: str) -> str:
    if value.startswith("#"):
        h = normalize_hex(value)
        HEX_NAMES = {
            "#fe4b01": "primary",
            "#f4f4f4": "bg",
            "#111011": "text",
            "#ffffff": "white",
            "#000000": "black",
            "#0078ff": "secondary",
            "#fafafa": "surface-muted",
            "#e8e8e8": "border-light",
            "#171717": "text-subtle",
            "#6f6f71": "work-muted",
            "#797b7c": "caption",
            "#1a1a1a": "surface-darker",
            "#0f0f0f": "surface-dark",
            "#2a2a2a": "surface-dark-mid",
            "#ebebeb": "surface-chrome",
            "#f0f0f0": "surface-subtle",
            "#f8f8f8": "surface-soft",
            "#ececec": "surface-elevated",
            "#111111": "text-alt",
            "#999999": "gray-999",
            "#808080": "gray-808",
            "#999999": "gray-999",
            "#999": "gray-999",
            "#22c55e": "success",
            "#24c400": "success-bright",
            "#4ade80": "success-light",
            "#16a34a": "success-dark",
            "#229ed9": "telegram",
            "#fe7a45": "primary-light",
            "#e64300": "primary-dark",
            "#51565a": "border-ui",
            "#d0d0d0": "gray-d0",
            "#d4d4d4": "gray-d4",
            "#fece7a": "service-gold",
            "#006c67": "service-teal",
            "#5e0130": "service-plum",
            "#31216f": "service-indigo",
            "#241a15": "gradient-warm-mid",
            "#3a2418": "gradient-warm-end",
            "#1a1c1d": "device-navy",
            "#09162a": "device-blue",
            "#ff5f57": "window-red",
            "#febc2e": "window-yellow",
            "#28c840": "window-green",
            "#dddddd": "illustration-light",
            "#c7c7c7": "illustration-mid",
            "#fff": "white",
            "#000": "black",
        }
        if h in HEX_NAMES:
            return HEX_NAMES[h]
        return f"shade-{h[1:]}"

    parsed = parse_rgba(value)
    if not parsed:
        return "unknown"
    r, g, b, a = parsed
    ap = round(a * 100)
    if r == 0 and g == 0 and b == 0:
        base = "black"
    elif r == 255 and g == 255 and b == 255:
        base = "white"
    elif r == 17 and g == 16 and b == 17:
        base = "ink"
    elif r == 254 and g == 75 and b == 1:
        base = "primary"
    elif r == 5 and g == 5 and b == 5:
        base = "shadow"
    elif r == 34 and g == 34 and b == 34:
        base = "charcoal"
    elif r == 34 and g == 197 and b == 94:
        base = "success"
    elif r == 22 and g == 163 and b == 74:
        base = "success-dark"
    elif r == 244 and g == 244 and b == 244:
        base = "bg"
    elif r == 120 and g == 120 and b == 120:
        base = "gray"
    elif r == 119 and g == 119 and b == 119:
        base = "gray"
    elif r == 128 and g == 128 and b == 128:
        base = "gray"
    else:
        base = f"rgb-{r}-{g}-{b}"
    if a == 1.0 and value.lower().startswith("rgb("):
        return base
    return f"{base}-a{ap}"


def collect_colors() -> dict[str, str]:
    mapping: dict[str, str] = {}
    for path in ROOT.rglob("*"):
        if path.suffix not in {".css", ".jsx", ".js"}:
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        for raw in COLOR_RE.findall(text):
            canon = canonical_color(raw)
            if canon not in mapping:
                mapping[canon] = token_name(canon)
    # Semantic aliases
    mapping["#fe4b01"] = "primary"
    mapping["#111011"] = "text"
    mapping["rgba(0, 0, 0, 0.6)"] = "muted"
    return mapping


def build_theme_block(mapping: dict[str, str]) -> str:
    lines = ["@theme {"]
    # Core semantic (user-requested)
    core = {
        "primary": "#fe4b01",
        "secondary": "#0078ff",
        "accent": "#fe4b01",
        "bg": "#f4f4f4",
        "text": "#111011",
        "muted": "rgba(0, 0, 0, 0.6)",
    }
    emitted: set[str] = set()
    for name, val in core.items():
        lines.append(f"  --color-{name}: {val};")
        emitted.add(name)
    # Legacy aliases used across CSS
    lines.append("  --color-ink: var(--color-text);")
    lines.append("  --color-surface: #ffffff;")
    lines.append("  --color-border: rgba(34, 34, 34, 0.12);")
    lines.append("  --color-glass: rgba(244, 244, 244, 0.12);")
    emitted.update({"ink", "surface", "border", "glass"})

    for canon, name in sorted(mapping.items(), key=lambda x: x[1]):
        if name in emitted or name in core:
            continue
        lines.append(f"  --color-{name}: {canon};")
        emitted.add(name)

    lines.append("  --font-display: 'Sora', system-ui, sans-serif;")
    lines.append("  --font-body: 'Inter Tight', 'Inter', system-ui, sans-serif;")
    lines.append("}")
    return "\n".join(lines)


def tailwind_class_for_token(token: str, prefix: str) -> str:
    return f"{prefix}-{token}"


def replace_in_content(text: str, mapping: dict[str, str], *, is_css: bool) -> str:
    # Build replacement list: longest first
    replacements: list[tuple[str, str]] = []
    for canon, name in mapping.items():
        var_ref = f"var(--color-{name})"
        replacements.append((canon, var_ref))
        # Also replace non-canonical variants of same color
        if canon.startswith("#"):
            short = canon
            if len(canon) == 7:
                # 6-digit hex variants
                replacements.append((canon.upper(), var_ref))
                replacements.append((canon.replace("#", "#").lower(), var_ref))
        if canon.startswith("rgba"):
            # spacing variants
            parsed = parse_rgba(canon)
            if parsed:
                r, g, b, a = parsed
                variants = [
                    f"rgba({r}, {g}, {b}, {a})",
                    f"rgba({r},{g},{b},{a})",
                    f"rgba({r}, {g}, {b}, {a:.2f})".rstrip("0").rstrip("."),
                ]
                for v in variants:
                    replacements.append((v, var_ref))

    # Dedupe and sort by length desc
    seen: set[tuple[str, str]] = set()
    unique: list[tuple[str, str]] = []
    for old, new in sorted(replacements, key=lambda x: len(x[0]), reverse=True):
        key = (old, new)
        if key not in seen:
            seen.add(key)
            unique.append((old, new))

    for old, new in unique:
        text = text.replace(old, new)

    if not is_css:
        # Tailwind arbitrary value classes -> theme utilities
        tw_patterns = [
            (r"text-\[#([0-9a-fA-F]{3,8})\]", "text"),
            (r"bg-\[#([0-9a-fA-F]{3,8})\]", "bg"),
            (r"border-\[#([0-9a-fA-F]{3,8})\]", "border"),
            (r"from-\[#([0-9a-fA-F]{3,8})\]", "from"),
            (r"via-\[#([0-9a-fA-F]{3,8})\]", "via"),
            (r"to-\[#([0-9a-fA-F]{3,8})\]", "to"),
        ]
        hex_to_token = {normalize_hex(k): v for k, v in mapping.items() if k.startswith("#")}
        for pattern, prefix in tw_patterns:
            def sub(m: re.Match[str], p=prefix) -> str:
                h = normalize_hex("#" + m.group(1))
                token = hex_to_token.get(h)
                if token:
                    return tailwind_class_for_token(token, p)
                return m.group(0)

            text = re.sub(pattern, sub, text, flags=re.I)

        # border-black/10 etc -> use tokens where we have them
        text = text.replace("border-black/10", "border-black-a10")

    return text


def main() -> None:
    mapping = collect_colors()
    theme = build_theme_block(mapping)

    colors_path = ROOT / "styles" / "colors.css"
    colors_path.parent.mkdir(parents=True, exist_ok=True)
    colors_path.write_text(
        "/* Auto-generated color tokens — edit values here to retheme the site */\n"
        + theme
        + "\n",
        encoding="utf-8",
    )

    index_css = ROOT / "index.css"
    index_text = index_css.read_text(encoding="utf-8")
    # Remove old @theme block
    index_text = re.sub(r"@theme\s*\{[^}]*\}\s*", "", index_text, count=1)
    index_text = '@import "./styles/colors.css";\n@import "tailwindcss";\n\n' + index_text.lstrip()
    if index_text.startswith('@import "./styles/colors.css";\n@import "tailwindcss";\n\n@import'):
        index_text = index_text.replace(
            '@import "./styles/colors.css";\n@import "tailwindcss";\n\n@import \'tailwindcss\';\n\n',
            '@import "./styles/colors.css";\n@import "tailwindcss";\n\n',
        )

    # Replace hardcoded colors in index.css (skip colors.css)
    index_text = replace_in_content(index_text, mapping, is_css=True)
    index_css.write_text(index_text, encoding="utf-8")

    for path in ROOT.rglob("*"):
        if path.suffix not in {".jsx", ".js"}:
            continue
        original = path.read_text(encoding="utf-8", errors="ignore")
        updated = replace_in_content(original, mapping, is_css=False)
        if updated != original:
            path.write_text(updated, encoding="utf-8")

    # Also replace colors.css definitions - they should stay as raw values in @theme only
    # Re-write colors.css with clean raw values (mapping keys)
    colors_css = colors_path.read_text(encoding="utf-8")
    # Undo accidental var() inside @theme values
    for canon, name in mapping.items():
        colors_css = colors_css.replace(f"--color-{name}: var(--color-{name});", f"--color-{name}: {canon};")
    colors_path.write_text(colors_css, encoding="utf-8")

    print(f"Defined {len(mapping)} color tokens in {colors_path}")
    print("Refactored index.css and component files.")


if __name__ == "__main__":
    main()
