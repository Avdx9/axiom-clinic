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
    SceneCanvas.tsx    Fixed full-screen <Canvas>, EffectComposer + Bloom
    ParticleField.tsx  InstancedMesh particle system (the 3D signature element)
  sections/
    Hero.tsx           "Performance Aesthetics" headline, staggered word reveal
    Manifesto.tsx       Scroll-scrubbed statement (useScroll + useTransform)
    Services.tsx        Treatment menu grid
    BookConsultation.tsx CTA + footer
  ui/
    RevealText.tsx      Shared Framer Motion primitives (block fade, word stagger)
```

## Design tokens

| Token        | Hex       | Use                                  |
|--------------|-----------|---------------------------------------|
| `bg`         | `#0a0a0a` | Page background                      |
| `surface`    | `#121212` | Reserved for lifted panels/modals    |
| `fg`         | `#f5f5f0` | Primary text (warm stark white)      |
| `muted`      | `#8a8a85` | Secondary text, labels               |
| `emerald`    | `#2ee6a8` | Primary neon accent                  |
| `cyan`       | `#5be3ff` | Secondary accent (particle gradient) |

Fonts: **Fraunces** (display, used sparingly for headlines), **Inter** (body), **JetBrains Mono** (clinical labels, codes, prices). All loaded via `next/font/google` — no extra network requests to manage.

## Performance & memory notes

- The particle field is a **single `InstancedMesh`** (one draw call for all 6,000 particles) rather than 6,000 individual meshes — this is what keeps it inside frame budget alongside Bloom.
- Particle positions sit on a **Fibonacci sphere**, computed once via `useMemo`. Nothing is re-randomized on render, so there's no per-frame array allocation beyond the `Object3D` reused for matrix math.
- `frustumCulled={false}` on the instanced mesh prevents particles from incorrectly disappearing, since per-instance positions move outside the geometry's default bounding sphere.
- **Disposal**: the effect in `ParticleField.tsx` explicitly disposes the geometry and material on unmount, in addition to React Three Fiber's own automatic disposal of JSX-declared objects — this is the explicit guarantee against leaking GPU buffers across hot-reloads or route changes.
- `dpr` is capped at `[1, 1.5]` in `SceneCanvas.tsx` so Bloom doesn't get applied at full Retina resolution on every device — drop this further (e.g. `[1, 1]`) if you need more headroom on low-end hardware.
- If you add more sections with their own canvases, keep this pattern (one InstancedMesh per effect) rather than scaling particle count — counts above ~10–15k will need points/sprites instead of icosahedra to stay smooth on integrated GPUs.

## Customizing

- **Copy/branding**: clinic name and copy live directly in each section component — there's no CMS layer, by design, since this is a single static page.
- **Colors**: edit `tailwind.config.ts` → `theme.extend.colors`. The particle gradient (`EMERALD`/`CYAN` consts in `ParticleField.tsx`) is separate from Tailwind and should be updated to match if you change the palette.
- **Particle density**: change the `count` prop passed to `<ParticleField />` in `SceneCanvas.tsx`.
- **Bloom intensity**: tune `intensity` / `luminanceThreshold` on the `<Bloom>` element in `SceneCanvas.tsx` — lower the threshold to make more of the scene glow, raise `intensity` for a hotter look.
