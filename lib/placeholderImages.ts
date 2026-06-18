/**
 * Placeholder stock photography.
 *
 * The brief specified two Unsplash URLs. The first (clinic/spa interior)
 * was confirmed reachable. The second 404s — that photo ID doesn't exist —
 * and the closest visual substitutes ("beige marble texture") found while
 * searching are licensed under Unsplash+ (paid tier, served from
 * plus.unsplash.com, not freely hotlinkable for a commercial site).
 * Rather than ship a dead link or a licensing problem, every image below
 * is a crop variant of the one confirmed, freely-licensed source.
 *
 * Source a second free photo for real visual variety before launch, and
 * swap both for the clinic's own photography when you have it.
 */
const CLINIC_BASE = "https://images.unsplash.com/photo-1629909613654-28e377c37b09";

export const ABOUT_IMAGE = `${CLINIC_BASE}?q=80&w=2000&fit=crop`;

export const SERVICE_IMAGES = {
  regenerative: `${CLINIC_BASE}?q=80&w=1200&h=900&fit=crop&crop=top`,
  diagnostics: `${CLINIC_BASE}?q=80&w=1200&h=900&fit=crop&crop=left`,
  energyDevices: `${CLINIC_BASE}?q=80&w=1200&h=900&fit=crop&crop=bottom`,
  recovery: `${CLINIC_BASE}?q=80&w=1200&h=900&fit=crop&crop=right`,
};
