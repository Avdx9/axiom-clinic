/**
 * Placeholder stock photography.
 *
 * Both base URLs below were confirmed reachable before being committed
 * here. `ABOUT_IMAGE` and `SERVICE_IMAGES` are crop variants of these two
 * sources (via Unsplash's imgix-powered `crop`/`w`/`h` params) rather than
 * several different guessed photo IDs — guessed Unsplash IDs frequently
 * 404, and a broken `<img>` is worse than a repeated source image.
 *
 * Swap these for the clinic's real photography before launch.
 */
const CLINICAL_BASE = "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2";
const AESTHETIC_BASE = "https://images.unsplash.com/photo-1519415943484-9fa1873496d4";

export const ABOUT_IMAGE = `${CLINICAL_BASE}?q=80&w=2000&fit=crop`;

export const SERVICE_IMAGES = {
  injectables: `${AESTHETIC_BASE}?q=80&w=1200&h=900&fit=crop&crop=top`,
  energyDevices: `${CLINICAL_BASE}?q=80&w=1200&h=900&fit=crop&crop=bottom`,
  skinHealth: `${AESTHETIC_BASE}?q=80&w=1200&h=900&fit=crop&crop=left`,
  recovery: `${CLINICAL_BASE}?q=80&w=1200&h=900&fit=crop&crop=right`,
};
