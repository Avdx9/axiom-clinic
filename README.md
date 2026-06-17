# AXIOM — Performance Aesthetics

A dark-mode, WebGL-backed single page for a London aesthetics clinic. Built with Next.js (App Router), Tailwind, Framer Motion, React Three Fiber + Drei, and `@react-three/postprocessing` for the bloom glow.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## How it's put together

```
app/
  layout.tsx        Loads the three font roles, sets metadata
  page.tsx           Stacks the canvas + sections
  globals.css         Tailwind layers, reduced-motion + focus-ring rules
components/
  canvas/
    SceneCanvas.tsx    Fixed full-screen <Canvas>, z-[-1], EffectComposer + Bloom
    NeuralField.tsx    InstancedMesh nodes + LineSegments edges + traveling pulses
  layout/
    Navbar.tsx          Fixed transparent nav, gains a glass background on scroll
  sections/
    Hero.tsx            "Performance Aesthetics" headline, staggered word reveal
    About.tsx            Clinic story, placeholder photography, credential chips
    Manifesto.tsx         Scroll-scrubbed statement (useScroll + useTransform)
    Services.tsx          Treatment menu grid, one image + lucide icon per card
    BookConsultation.tsx CTA + footer
  ui/
    RevealText.tsx      Shared Framer Motion primitives (block fade, word stagger)
    GlassPanel.tsx        Frosted backdrop used behind every text block
lib/
  placeholderImages.ts   Single source of truth for the Unsplash placeholder
```

**On the particle system**: the brief asked for something that reads as a
"digital nervous system / data flow" rather than ambient dust. `NeuralField`
is a volumetric sphere of nodes (one `InstancedMesh`, one draw call),
connected to their nearest neighbours via a single `LineSegments` draw call,
with a small population of pulses traveling along those edges on a loop —
that's the "data flow" read. All three live under one rotating `<group>` so
they never drift out of sync, and `NeuralField.tsx` explicitly disposes the
hand-built line geometry on unmount (it's not JSX-declared, so React Three
Fiber's automatic disposal doesn't cover it).

**On the placeholder images**: every `<img>` in `About`/`Services` points at
crop/desaturation variants of the single Unsplash URL from the brief
(`lib/placeholderImages.ts`), not several different guessed photo IDs —
guessed IDs frequently 404. Swap `BASE_IMAGE` for real clinic photography
before launch. Plain `<img>` tags are used instead of `next/image` on
purpose, to avoid needing to allowlist `images.unsplash.com` in
`next.config.mjs` for a temporary placeholder.

## Design tokens

| Token       | Source                          | Use                                  |
|-------------|----------------------------------|---------------------------------------|
| `neutral-950` | Tailwind built-in (`#0a0a0a`)  | Page background                      |
| `neutral-50`  | Tailwind built-in (~white)    | Headers, high-contrast text          |
| `neutral-400` | Tailwind built-in (light grey)| Paragraph/body copy                  |
| `neutral-800/50` | Tailwind built-in          | Hairline borders on glass panels     |
| `champagne` | Custom token, `#d4af37`         | The one accent — buttons, eyebrows, icons, active states. Used sparingly. |

There's deliberately no second accent hue anymore — the old emerald/cyan
duo is gone. Where the particle field needs visual depth (`NeuralField.tsx`),
it varies *lightness* within the champagne hue (a deep bronze `#5a4115` at
the dark end) rather than introducing a second color, so the canvas reads
as "subtle gold texture" rather than "neon."

Fonts: a single clean sans (**Inter**) for both display and body text —
headers lean on `font-bold tracking-tighter` for visual weight instead of
a second typeface. **JetBrains Mono** still handles clinical labels, codes,
and prices.

## Canvas restraint

The 3D layer is intentionally backed off so it never competes with text:

- The entire `<Canvas>` wrapper in `SceneCanvas.tsx` carries `opacity-35` —
  applied once to the wrapper div, which dims nodes, edges, pulses and
  Bloom together, rather than tuning five separate material opacities.
- Bloom `intensity` was dropped from `1.4` to `0.9` and `luminanceThreshold`
  raised to `0.25`, so it glows just enough to read as ambient light rather
  than as the page's main visual event.
- Every text block additionally sits on its own `GlassPanel`
  (`backdrop-blur-xl bg-neutral-950/60 border-neutral-800/50`) — even with
  the canvas this restrained, legibility doesn't rely on opacity alone.



## Performance & memory notes

- The particle field is a **single `InstancedMesh`** (one draw call for all 6,000 particles) rather than 6,000 individual meshes — this is what keeps it inside frame budget alongside Bloom.
- Particle positions sit on a **Fibonacci sphere**, computed once via `useMemo`. Nothing is re-randomized on render, so there's no per-frame array allocation beyond the `Object3D` reused for matrix math.
- `frustumCulled={false}` on the instanced mesh prevents particles from incorrectly disappearing, since per-instance positions move outside the geometry's default bounding sphere.
- **Disposal**: the effect in `ParticleField.tsx` explicitly disposes the geometry and material on unmount, in addition to React Three Fiber's own automatic disposal of JSX-declared objects — this is the explicit guarantee against leaking GPU buffers across hot-reloads or route changes.
- `dpr` is capped at `[1, 1.5]` in `SceneCanvas.tsx` so Bloom doesn't get applied at full Retina resolution on every device — drop this further (e.g. `[1, 1]`) if you need more headroom on low-end hardware.
- If you add more sections with their own canvases, keep this pattern (one InstancedMesh per effect) rather than scaling particle count — counts above ~10–15k will need points/sprites instead of icosahedra to stay smooth on integrated GPUs.

## Customizing

- **Copy/branding**: clinic name and copy live directly in each section component — there's no CMS layer, by design, since this is a single static page.
- **Colors**: the accent lives in `tailwind.config.ts` → `theme.extend.colors.champagne`. Everything else uses Tailwind's built-in `neutral-*` scale directly in each component's classes (no alias) — change those class names directly if you want a different base palette. The particle gradient (`CHAMPAGNE`/`DEEP_BRONZE` consts in `NeuralField.tsx`) is separate from Tailwind and should be updated to match if you change the accent.
- **Particle density**: change the `nodeCount` prop passed to `<NeuralField />` in `SceneCanvas.tsx`. More nodes also means more edges (capped at 700) and a slightly heavier nearest-neighbour computation on mount.
- **Canvas presence**: the `opacity-35` wrapper class in `SceneCanvas.tsx` is the single dial for "how much background." Raise it if the canvas feels too faint after a palette change; the Bloom `intensity`/`luminanceThreshold` props are the next lever if it's the glow specifically that's too strong or too weak.
