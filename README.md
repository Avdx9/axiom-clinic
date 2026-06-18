# AURA — The Architecture of Longevity

A warm, "clinical luxury" single page for a London longevity clinic. Built with Next.js (App Router), Tailwind, Framer Motion, and React Three Fiber for a soft, undulating "liquid silk" background surface.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## How it's put together

```
app/
  layout.tsx        Loads the font trio, sets metadata
  page.tsx           Stacks the canvas + sections + footer
  globals.css         Tailwind layers, reduced-motion + focus-ring rules
components/
  canvas/
    SceneCanvas.tsx    Fixed full-screen <Canvas>, z-[-1], warm lighting, no postprocessing
    SilkSurface.tsx    The undulating plane — see "The silk surface" below
  layout/
    Navbar.tsx          Fixed transparent nav, gains a light glass background on scroll
    Footer.tsx           Solid stone-950 anchor at the bottom of the page
  sections/
    Hero.tsx            "The Architecture of Longevity" headline
    About.tsx            Clinic story, full-color photography, credential chips
    Manifesto.tsx         Scroll-scrubbed statement (useScroll + useTransform)
    Services.tsx          Treatment menu grid, one image + lucide icon per card
    BookConsultation.tsx CTA panel
  ui/
    RevealText.tsx      Shared Framer Motion primitives (block fade, word stagger)
    GlassPanel.tsx        Translucent white glass panel used behind every text block
lib/
  placeholderImages.ts   Single source of truth for the Unsplash placeholder
```

## Design tokens

| Token         | Source                     | Use                                  |
|---------------|------------------------------|----------------------------------------|
| `stone-50`    | Tailwind built-in (`#fafaf9`) | Page background (warm off-white)     |
| `stone-900`   | Tailwind built-in            | Primary text                          |
| `stone-500`   | Tailwind built-in            | Secondary/body text                   |
| `stone-950`   | Tailwind built-in            | Footer background only                |
| `gold`        | Custom token, `#b49a5b`      | The one accent — buttons, eyebrows, icons. Used sparingly. |

One accent color, applied narrowly, on purpose — anywhere you see warmth
or visual interest beyond that should come from photography, the silk
surface, or typography, not from adding a second hue.

**Fonts**: Cormorant Garamond for display headlines (`font-serif`, via an
overridden Tailwind token so you just use the standard utility class),
Inter for body copy, JetBrains Mono for clinical labels/codes/prices. The
contrast between the soft serif and the clinical mono is the brand's one
deliberate typographic tension.

## The silk surface

`SilkSurface.tsx` is a single `PlaneGeometry` (80×80 segments, ~6,500
vertices) deformed every frame by a two-term sine height field, tilted to
recede away from the camera like a sheet of fabric on a table. Two
implementation choices are worth knowing about if you're modifying it:

- **Normals are computed analytically, not via `computeVertexNormals()`.**
  For a height field `z = f(x, y)`, the surface normal at any point is
  `normalize(-∂f/∂x, -∂f/∂y, 1)`. Since the height function is just two
  sine terms, its partial derivatives are closed-form and cheap to
  evaluate — this avoids walking face data every frame, which is what
  `computeVertexNormals()` does and which gets expensive fast at this
  vertex count, 60 times a second.
- **Base x/y positions are cached once** (`basePositions`) rather than
  read back from the mutated position buffer each frame, so there's no
  drift and no need to "remember" the flat geometry separately.
- The geometry is created by hand and passed to `<mesh>` as a `geometry`
  prop rather than declared as a JSX child, so it's outside React Three
  Fiber's automatic disposal — `SilkSurface.tsx` disposes it explicitly
  on unmount.

There's deliberately no Bloom/EffectComposer pass on this scene — the
brief is explicit that this aesthetic wants soft warm lighting, not a
glow effect.

## On the placeholder images

The brief specified two Unsplash URLs. The first (clinic/spa interior)
resolves and is used as-is. The second 404s outright — that photo ID
doesn't exist — and the best visual substitutes found while searching
turned out to be Unsplash+ (paid tier, served from `plus.unsplash.com`,
not freely hotlinkable). Every image on the page is therefore a crop
variant of the one confirmed, freely-licensed source
(`lib/placeholderImages.ts`). Source a second free photo for real visual
variety, and swap both for the clinic's real photography before launch.

## Customizing

- **Accent color**: `tailwind.config.ts` → `theme.extend.colors.gold`. Update `SilkSurface.tsx`'s material `color` prop too if you want the surface itself to shift hue.
- **Surface intensity**: the amplitude constants `A1`/`A2` at the top of `SilkSurface.tsx` control how much the plane undulates — both are intentionally tiny (a few hundredths of a unit). Raise them gradually; this is meant to read as "breathing," not "ocean."
- **Segment density**: `widthSegments`/`heightSegments` props on `<SilkSurface />` in `SceneCanvas.tsx`. Lower if you need more headroom on low-end devices — the per-frame cost scales linearly with vertex count.
