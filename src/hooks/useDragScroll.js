import { useEffect, useRef } from 'react';

/**
 * Horizontal drag-to-scroll (mouse + touch) on a scrollable element.
 */
export function useDragScroll(ref) {
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const endDrag = (pointerId) => {
      const drag = dragRef.current;
      if (!drag.active) return;
      drag.active = false;
      drag.pointerId = null;
      el.classList.remove('is-dragging');
      if (pointerId != null && el.hasPointerCapture(pointerId)) {
        el.releasePointerCapture(pointerId);
      }
    };

    const onPointerDown = (event) => {
      // Touch: use native scroll so vertical page scroll still works on mobile
      if (event.pointerType !== 'mouse') return;
      if (event.button !== 0) return;

      dragRef.current = {
        active: true,
        pointerId: event.pointerId,
        startX: event.clientX,
        scrollLeft: el.scrollLeft,
        moved: false,
      };

      el.classList.add('is-dragging');
      el.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event) => {
      const drag = dragRef.current;
      if (!drag.active || drag.pointerId !== event.pointerId) return;

      const delta = event.clientX - drag.startX;
      if (Math.abs(delta) > 4) drag.moved = true;
      el.scrollLeft = drag.scrollLeft - delta;
    };

    const onPointerUp = (event) => {
      endDrag(event.pointerId);
    };

    const onClick = (event) => {
      if (dragRef.current.moved) {
        event.preventDefault();
        event.stopPropagation();
        dragRef.current.moved = false;
      }
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    el.addEventListener('click', onClick, true);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('click', onClick, true);
      el.classList.remove('is-dragging');
    };
  }, [ref]);
}
