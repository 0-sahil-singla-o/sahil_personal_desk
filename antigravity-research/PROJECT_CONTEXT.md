# Project Context & Reverse-Engineering Architecture

## 1. Project Overview & Target Website
- **Target URL**: [https://www.pradiplabs.dev/](https://www.pradiplabs.dev/)
- **Owner / Creator of Clone**: Sahil Singla (`sahil_desk`)
- **Core Technology Stack**: Three.js, React 18, React Three Fiber (R3F), Drei, Vite 5, Tailwind CSS, TypeScript.
- **Goal**: 100% fidelity clone of the interactive 3D procedural desk portfolio, completely self-contained locally, customized with Sahil's branding and a custom Indigo-Violet theme controlled by the 3D desk lamp.

---

## 2. Complete Engineering & Troubleshooting History

### Phase 1: Reverse-Engineering the Procedural 3D Scene (REA)
1. **Initial Assessment**:
   - The target website does **not** use external `.glb` or `.gltf` 3D model files.
   - All 3D objects (desk table, laptop, receipt printer, tablet, coffee mug, cat, Zoro figurine, glasses, parcel) are **procedurally constructed** using Three.js extrusions, beveled slab geometries, and custom 2D canvas shaders (e.g. 340-line oak grain PRNG algorithm using Mulberry32, brushed titanium etched canvas).
2. **Dynamic Chunks Discovery**:
   - The initial web bundle extraction was missing 15 dynamically loaded chunks, causing `404 Not Found` and blank-screen errors when mounting.
   - Identified all dynamic import references using AST analysis and downloaded:
     - `MusicDock-D5SjbxWF.js`, `Coffee-vfgjKnFA.js`, `Devices-DpLAxNXL.js`, `Furniture-CsO1rW37.js`, `Laptop-LQXRtVdY.js`, `Plant-2zeGJnHP.js`, `Printer-CxJE2qFT.js`, `Zoro-B6Lk-DKv.js`, `cardFaces-BhqK1wyY.js`, `doodles-isbl70mL.js`, `store-ePXdNfWM.js`, `sydneySun-BRFxnAmr.js`, `fold-3WTlVEfB.js`, `geometry-smdDo6YF.js`, `index-Cp_ezE54.js`.
   - Placed them into `assets/` and `public/assets/`.

### Phase 2: Local Mock API Middleware
- In `vite.config.ts`, created a local mock backend to intercept all API calls so the site runs 100% offline with zero external network requests:
  - `GET /api/receipts` & `POST /api/receipts`: Interactive receipt printing on the tablet docket.
  - `GET /api/plant` & `POST /api/plant`: Interactive watering counter for the succulent.
  - `GET /api/diary` & `POST /api/diary`: Guestbook notes.
  - `GET /api/poll` & `POST /api/poll`: Interactive desk item voting.
  - `GET /api/feed`: Activity feed.
  - `GET /api/songs` & `POST /api/songs`: Song requests on the vinyl record dock.

### Phase 3: Personalization & Eliminating Target Metadata
1. **Static HTML ([index.html](file:///d:/Sahil/Three%20js%20websites/sahil_desk/index.html))**:
   - Cleaned out all original SEO metadata pointing to `https://www.pradiplabs.dev/`.
   - Updated canonical link and OpenGraph URLs to local `/`.
   - Updated author to `Sahil Singla`.
   - Removed external Awwwards nominee ribbon link.
2. **React Hydration Branding**:
   - Safely replaced hardcoded strings inside `assets/index-CVLljmmv.js`:
     - `children: "Hi, I'm Pradip."` -> `children: "Hi, I'm Sahil."`
     - `document.title = "Pradip Dhakal ..."` -> `document.title = "Sahil Singla · Creative Three.js Developer"`
     - Updated visiting card and contact links to Sahil's details.

### Phase 4: Custom Indigo-Violet Design System
Implemented the user's custom design system:
1. **[tokens.css](file:///d:/Sahil/Three%20js%20websites/sahil_desk/public/tokens.css)**:
   - Tier 1: Neutral (50 to 950), Accent Violet, Highlights 1/2/3 (Teal, Pink, Fuchsia), Status ramps, alpha ramps.
   - Tier 2:
     - **Dark Mode (Default)**: `#2E1065` canvas, `#1B1230` vignette, rich glowing blobs (mauve, pink, blue-violet, fuchsia).
     - **Light Mode**: `#F9F7FD` pearl canvas, `#E6DFF5` lavender vignette, watercolor glow tints, jewel dust.
2. **[background.css](file:///d:/Sahil/Three%20js%20websites/sahil_desk/public/background.css)**:
   - The `.bg-field` container with 5 drifting blobs (`.bg-blob-1` to `.bg-blob-5`) utilizing `@keyframes bg-drift-*` and color-shifting `@keyframes bg-shade`.
   - Glass surface classes (`.surface-default`, `.surface-raised`, `.surface-overlay`, etc.).
   - Hidden the original opaque brown room gradient to allow the glowing background to shine seamlessly behind the 3D desk.
3. **[background.js](file:///d:/Sahil/Three%20js%20websites/sahil_desk/public/background.js)**:
   - Injects particle canvas with 90–190 twinkling dust flecks featuring depth scaling and mouse parallax.
   - Exposes `window.BgField = { pause, resume, refresh, setTheme }`.
4. **Typography**:
   - Google Fonts: **Outfit** (headings), **Figtree** (body/UI), **JetBrains Mono** (code).
   - Formatted two-tone headline: `Hi, I'm `<span class="text-accent">`Sahil.`</span>

### Phase 5: Controlling the Theme via the 3D Desk Lamp
- Intercepted the 3D lamp's internal store state (`ce.evening` and `F.toggleLamp()`).
- Hooked store transitions directly to `window.BgField.setTheme(isDark ? 'dark' : 'light')`.
- **Two-way sync**:
  - Clicking the 3D orange dome desk lamp toggles the lamp light ON/OFF and switches between Dark and Light mode.
  - Clicking the floating top-left UI pill (`🌙 Dark` / `☀️ Light`) turns the 3D lamp on/off in sync.

### Phase 6: Custom 3D Procedural Figurines — Straw Hat Pirates Collection (One Piece)
Created and integrated 5 new custom 3D figurines alongside the original Zoro collectible (6 total Straw Hats), fully matching the stylized Funko Pop / vinyl collectible aesthetic (satin sheen PBR materials, bobblehead spring oscillation on tap, contact shadow pads, and interactive pill tooltips):

1. **Monkey D. Luffy (Captain)**:
   - **Model Component**: `src/components/3d/items/LuffyItem.tsx`
   - **Visual Details**: Handcrafted straw hat with wide curved brim, crown indentation, and red band; dark messy bangs; left-eye scar; joyful grin; open red vest; yellow waist sash; blue denim shorts with folded white cuffs; sandals.
   - **Interaction**: Tap oscillation physics (`speed += 3.2`, `tiltSpeed += 1.4`), audio click trigger, and tooltip: `"Monkey D. Luffy · give him a tap"`.

2. **Roronoa Zoro (Swordsman / First Mate)**:
   - **Model Component**: `src/components/3d/items/ZoroItem.tsx` / `Kl` in bundle.
   - **Visual Details**: Signature cropped sea-green hair, black bandana band, left-eye diagonal scar, green samurai coat with purple sash, dual katanas mounted at the hip.
   - **Interaction**: Bobblehead tap oscillation + tooltip: `"Roronoa Zoro · give him a tap"`.

3. **Cat Burglar Nami (Navigator)**:
   - **Model Component**: `src/components/3d/items/NamiItem.tsx`
   - **Visual Details**: Vibrant flowing orange hair; blue & white striped halter bikini top; low-rise blue denim jeans; brown belt with gold buckle; orange shoes; tangerine shoulder tattoo; Log Pose navigator bracelet; segmented Clima-Tact weather staff.
   - **Interaction**: Bobblehead tap oscillation + tooltip: `"Cat Burglar Nami · give her a tap"`.

4. **Sniper King Usopp (Sniper)**:
   - **Model Component**: `src/components/3d/items/UsoppItem.tsx`
   - **Visual Details**: Signature long cylindrical nose; curly dark afro puffs; white beanie/bandana with sniper goggles (teal lenses); mustard-yellow cargo overalls with brown utility shoulder strap; wrist wraps; leather satchel bag; Kuro Kabuto slingshot.
   - **Interaction**: Bobblehead tap oscillation + tooltip: `"Sniper King Usopp · give him a tap"`.

5. **Nico Robin (Archaeologist)**:
   - **Model Component**: `src/components/3d/items/RobinItem.tsx`
   - **Visual Details**: Sleek raven-black hair with front fringe; tinted orange aviator sunglasses perched on forehead; fitted navy leather vest with gold zipper; flowing indigo sarong skirt with gold border; signature crossed-arms *Cien Fleur* pose.
   - **Interaction**: Bobblehead tap oscillation + tooltip: `"Nico Robin · give her a tap"`.

6. **Black Leg Sanji (Cook)**:
   - **Model Component**: `src/components/3d/items/SanjiItem.tsx`
   - **Visual Details**: Golden blonde hair swept over one eye; curly spiral eyebrow; cigarette in mouth with glowing emissive red ember (`#EF4444`); tailored black double-breasted suit; royal blue dress shirt; black tie; hands tucked casually into pockets; polished black dress shoes.
   - **Interaction**: Bobblehead tap oscillation + tooltip: `"Black Leg Sanji · give him a tap"`.

*(Note: Per explicit user instructions, Jimbei, Brook, and Franky were intentionally omitted from the collection).*

### Phase 7: Desk Layout & Staggered Viewport Optimization
To prevent any figurine from being obstructed by the tablet docket or receipt printer, an optimized two-row staggered formation was implemented on the left side of the oak desk (`X = -5.85` to `-3.80`, `Z = -2.75` to `-2.05`):

```typescript
// Optimized coordinates in DeskLayout.ts & DeskScene bundle:
zoro:  { position: [-5.60, 0, -2.15], rotY: 0.25 }, // Front Row Left
luffy: { position: [-4.70, 0, -2.10], rotY: 0.18 }, // Front Row Center
nami:  { position: [-3.80, 0, -2.05], rotY: 0.10 }, // Front Row Right
usopp: { position: [-5.85, 0, -2.75], rotY: 0.28 }, // Back Row Left (outer flank)
robin: { position: [-5.15, 0, -2.75], rotY: 0.20 }, // Back Row Mid (peeking between Zoro & Luffy)
sanji: { position: [-4.25, 0, -2.70], rotY: 0.14 }, // Back Row Right (peeking between Luffy & Nami)
```

- Each figurine sits with a dedicated `ShadowPad` (`Fe`) at `y = 0` providing realistic ambient occlusion contact shadows on the oak wood surface.
- Arrival animations are cleanly staggered with arrival orders 12 through 17 via the `Ee` arrival controller and `ns(order)` stagger function.

### Phase 8: Git Remote & Source Code Control
- Connected repository to GitHub remote: `https://github.com/0-sahil-singla-o/sahil_personal_desk.git`.
- Both TypeScript source components (`src/components/3d/items/*Item.tsx`, `DeskLayout.ts`, `DeskScene.tsx`) and production bundles (`assets/DeskScene-tZGhJadU.js`, `public/assets/DeskScene-tZGhJadU.js`) are kept 100% in sync.
- Tracked on branch `main`.

---

## 3. Directory Structure & Key Files

```
sahil_desk/
├── assets/                     # Complete Three.js WebGL procedural engine & React chunks
├── public/
│   ├── tokens.css              # Tier 1 primitives & Tier 2 semantic variables (Dark & Light)
│   ├── background.css          # Animated drifting blobs, surface glass, typography
│   ├── background.js           # Particle canvas & window.BgField controller
│   ├── fonts/                  # Woff2 fonts (Caveat handwriting, Inter)
│   ├── desk/                   # Screen textures for laptop, tablet, phone
│   ├── logos/                  # Brand/work showcase icons
│   └── work/                   # Portfolio work covers
├── src/                        # Clean TypeScript architecture (components, 3D items, store)
│   ├── components/3d/items/    # Procedural 3D desk objects (Straw Hats: Luffy, Zoro, Nami, Sanji, Usopp, Robin, + Laptop, Table, etc.)
│   ├── components/3d/core/     # Canvas, Camera, Lighting, Shadows, Layout
│   ├── components/ui/          # Modals, Overlays, Header, Navigation
│   └── store/deskStore.ts      # Zustand/store definition
├── antigravity-research/       # Reverse-engineering discovery scripts & raw reference copies
│   ├── PROJECT_CONTEXT.md      # This file
│   ├── downloaded_site/        # Untouched raw bundle backup
│   └── _research/              # Formatted inspection dumps
├── index.html                  # HTML entry point, theme bootstrap snippet
├── vite.config.ts              # Vite server & local mock API handlers
└── package.json                # Dependencies and scripts
```

---

## 4. Instructions for Any Future AI Agent on Another PC

If you are an AI assistant picking up this codebase on another machine:
1. **To start the project**:
   ```bash
   cd sahil_desk
   npm install
   npm run dev
   ```
2. **Access local server**: Open `http://localhost:5173/`.
3. **Core rules to respect**:
   - **Do not alter 3D object materials or shaders** unless specifically requested by the user.
   - Maintain the **two-tier design token system** in `public/tokens.css` (never hardcode arbitrary hex/rgb colors in component CSS).
   - Theme switching is driven by the desk lamp store in `assets/index-CVLljmmv.js` (`F.toggleLamp()`). Keep the two-way sync between the lamp and `window.BgField`.
   - All research scripts and raw reference copies live safely in `antigravity-research/` for reference.
