/** Hero showcase carousel — Abdullah Ahmad's real projects */
const AAK = 'https://www.aak-tech.dev/assets/projects';

export const HERO_CARD_HEIGHT = 356;
export const HERO_CAROUSEL_GAP = 16;
export const HERO_CARD_PADDING_LEFT = 16;

export const HERO_SHOWCASE = [
  { label: 'Dropella — e-commerce toolkit', url: `${AAK}/dropella-sveltekit-supabase-project-image.jpg`, width: 560 },
  { label: 'Basemint — NFT pixel art', url: `${AAK}/basemint-project.png`, width: 520 },
  { label: 'DeltaTest — browser app testing SaaS', url: `${AAK}/deltatest-mobile-emulator-saas-platform-project-image.png`, width: 500 },
  { label: 'Designer Pro — real-time design collab', url: `${AAK}/designer-pro-designers-tool-app-project-image.png`, width: 520 },
  { label: 'Dropella — e-commerce toolkit', url: `${AAK}/dropella-sveltekit-supabase-project-image.jpg`, width: 480 },
  { label: 'Basemint — NFT pixel art', url: `${AAK}/basemint-project.png`, width: 540 },
  { label: 'DeltaTest — browser app testing SaaS', url: `${AAK}/deltatest-mobile-emulator-saas-platform-project-image.png`, width: 520 },
  { label: 'Designer Pro — real-time design collab', url: `${AAK}/designer-pro-designers-tool-app-project-image.png`, width: 480 },
].map((item) => ({ ...item, image: item.url }));
