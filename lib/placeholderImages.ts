/**
 * Placeholder stock photography.
 *
 * This is the exact Unsplash image referenced in the original brief. Every
 * URL below is a crop/desaturation variant of that ONE confirmed-working
 * source (via Unsplash's imgix-powered query params: `crop`, `sat`, `w`,
 * `h`) rather than several different guessed photo IDs — guessed Unsplash
 * IDs frequently 404, and a broken `<img>` is worse than a repeated one.
 *
 * Swap `BASE_IMAGE` for the clinic's real photography before launch.
 */
const BASE_IMAGE = "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2";

export const ABOUT_IMAGE = `${BASE_IMAGE}?q=80&w=2000&fit=crop`;

export const SERVICE_IMAGES = {
  injectables: `${BASE_IMAGE}?q=80&w=1200&h=900&fit=crop&crop=top`,
  energyDevices: `${BASE_IMAGE}?q=80&w=1200&h=900&fit=crop&crop=bottom&sat=-100`,
  skinHealth: `${BASE_IMAGE}?q=80&w=1200&h=900&fit=crop&crop=left`,
  recovery: `${BASE_IMAGE}?q=80&w=1200&h=900&fit=crop&crop=right&sat=-100`,
};
