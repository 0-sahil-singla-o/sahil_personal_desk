# Pomodoro Timer Reverse-Engineering & 3D Desk Integration Context

## 1. Overview & Objectives
- **Target URL**: [https://pomodorotimer.online/](https://pomodorotimer.online/)
- **Target Application**: Interactive Tablet placed on Sahil's 3D procedural desk (`sahil_desk`).
- **Owner**: Sahil Singla
- **Status**: Completed 100% visual parity and live animation integration. Ready for backend microservices phase.

### Primary Goals:
1. **100% Visual and Behavioral Clone**:
   - Reverse-engineer [pomodorotimer.online](https://pomodorotimer.online/) using REA (Reverse Engineering Anything) and replicate the user experience inside the interactive 3D tablet on Sahil's desk.
   - Replace the legacy static Docker dashboard screen texture with an active, real-time Pomodoro timer.
2. **Complete In-Focus & Out-of-Focus Visual Parity**:
   - Both the zoomed-in focused tablet modal view and the out-of-focus 3D desk view render identical UI elements in real time (top navigation pills, left floating dock, glowing countdown dial, active task indicator, motivational quote, and bottom dock).
3. **Live Video Backgrounds & Ambient Effects Physics**:
   - Clone the official animated `/bg-lofi.mp4` video background (featuring the study girl by the rainy window) and render it seamlessly on both the focused overlay and directly onto the 3D tablet's canvas texture.
   - Implement authentic canvas particle simulations for ambient effects: **Rain**, **Bubbles**, **Stars**, and **Motes**.
4. **Scope Exclusions**:
   - **Music Player**: Excluded from the tablet UI. Reserved for the physical vinyl record radio dock on the desk.
   - **Discord & Auth**: Excluded. No external login, sign-up, or Discord integration.
   - **Git Rules**: NEVER execute `git push` without explicit user confirmation.

---

## 2. Reverse Engineering Findings (REA)

### Target Site Architecture (`pomodorotimer.online`)
1. **Framework & Client**:
   - Built on Nuxt 3 / Vue 3 with Tailwind CSS and custom canvas overlay rendering.
   - Core client logic bundle: `_nuxt/C5QkuRi-.js`.
2. **Themes & Backgrounds**:
   - **Lofi Scene**: Uses a dynamic video stream `<video class="bg-video ready" src="/bg-lofi.mp4" autoplay loop muted playsinline>` (497 KB, 1280x720, H.264).
   - **Fantasy, Pastel, Cyberpunk**: Use high-resolution `.webp` image assets (`bg-fantasy.webp`, `bg-pastel.webp`, `bg-cyberpunk.webp`) and accompanying thumbnails (`-thumb.webp`).
3. **Ambient Particle System**:
   - Implemented via a transparent canvas `<canvas class="fx-canvas">` overlaid between the background and UI.
   - Particle mathematics extracted from function `M(e)` in `C5QkuRi-.js`:
     * **Rain**: Fast downward angled streaks (`vx = -1.2`, `vy = 18..28`, length `24..42`), splash animation on floor boundary reset.
     * **Bubbles**: Rising buoyant particles (`vy = -0.8..-2.2`) with sinusoidal horizontal wobble (`sin(time * freq) * amp`), translucent body (`rgba(255,255,255,0.18)`), and an offset specular crescent arc highlight (`rgba(255,255,255,0.7)`).
     * **Stars**: Static coordinate field with sinusoidal brightness pulsing (`opacity = base + sin(time * speed + phase) * amp`).
     * **Motes**: Gentle upward drift with soft glow halo (`ctx.shadowBlur = 14`, `ctx.shadowColor = accentColor`).

---

## 3. Implementation Architecture

### A. State Engine (`public/pomodoroEngine.js` & `assets/pomodoroEngine.js`)
The single source of truth for the Pomodoro timer across both 3D and 2D contexts.
- **State Store (`window.__pomodoroEngine`)**:
  - `timeLeft`: Timer countdown in seconds (default `25 * 60`).
  - `duration`: Session duration in seconds (default `25 * 60`).
  - `isRunning`: Boolean timer state.
  - `mode`: Current mode (`"focus" | "shortBreak" | "longBreak"`).
  - `streak`: Number of completed focus sessions (e.g., `1`).
  - `theme`: Active scene (`"lofi" | "fantasy" | "pastel" | "cyberpunk"`).
  - `accent`: Primary UI color token (`"#84cc16"` lime, `"#06b6d4"` cyan, etc.).
  - `ambientEffect`: Active particle effect (`"off" | "rain" | "bubbles" | "stars" | "motes"`).
  - `tasks`: Task list with completion toggles and tomato estimate counters.
  - `activeTaskId`: Currently focused task ID.
  - `quote`: Motivational quote in Playfair Display cursive.
- **Offscreen Canvas Rendering (`renderToCanvas`)**:
  - Automatically draws to a high-resolution `1024x640` canvas (`window.__pomodoroCanvas`).
  - Renders live video frames from hidden HTML5 `<video src="/bg-lofi.mp4">` when `theme === 'lofi'`.
  - Simulates ambient particles directly on the canvas so that ambient animations appear live on the 3D desk tablet.
  - Renders UI elements with exact pixel layout:
    * Top Bar: `"Pomodoro Timer"`, `🔥 streak`, `🎨 Aesthetics`, `⚙️ Settings`.
    * Left Vertical Dock: Capsule containing `🏆`, `🔥`, `🎨`, `⚙️`.
    * Dial: Circular glowing ring with percentage arc, Space Grotesk clock, and `• Focus in progress` pill.
    * Active Task Bar: `🎯 Focusing on: <Task Title> 🍅 <act>/<est>`.
    * Motivational Quote: Centered italic cursive.
    * Bottom Dock: Reset `↺`, dynamic Start/Pause pill button in active accent color, and `📋 Tasks (<count>)`.

### B. Focused Tablet UI Overlay (`src/components/ui/ScreenOverlay.tsx` & `assets/ScreenOverlay-BcVxfGAm.js`)
When the user clicks the tablet on the desk, the camera smoothly zooms into the focused overlay:
- Plays `<video src="/bg-lofi.mp4" autoPlay loop muted playsInline>` behind frosted glass surface.
- Runs `AmbientCanvas` React component for GPU-accelerated particle animation.
- Includes functional drawers:
  - **Aesthetics Drawer**: 2x2 scenes grid (`Lofi`, `Pastel`, `Fantasy`, `Cyberpunk`), custom user photo dropzone modal, 6 accent color swatches, and ambient effect selection pills.
  - **Tasks Drawer**: Task list, active task selector, completion checkboxes, tomato estimate increments, and new task input.
  - **Settings Modal**: Duration configuration for focus, short break, and long break intervals.

### C. 3D Tablet Integration (`src/components/3d/items/TabletItem.tsx` & `assets/DeskScene-tZGhJadU.js`)
- Replaced static Docker texture loader with Three.js `CanvasTexture` referencing `window.__pomodoroCanvas`.
- Set `colorSpace = SRGBColorSpace` and `minFilter = LinearFilter`.
- Canvas updates flag `texture.needsUpdate = true` on every frame tick (60 FPS during timer run or video/particle playback).
- Integrated load-readiness listeners ensuring immediate render in both Dark and Light modes on initial page load.

---

## 4. Key Files & Asset Locations

```
sahil_desk/
├── public/
│   ├── bg-lofi.mp4                 # Target animated video background (497 KB)
│   ├── bg-lofi.webp                # Static fallback for Lofi theme
│   ├── bg-fantasy.webp             # Fantasy theme background
│   ├── bg-pastel.webp              # Pastel theme background
│   ├── bg-cyberpunk.webp           # Cyberpunk theme background
│   ├── bg-*-thumb.webp             # Scene selection thumbnail cards
│   ├── pomodoroEngine.js           # Core state store, tick loop, and 2D canvas renderer
│   └── desk/                       # Asset mirror for production bundle paths
├── assets/
│   ├── pomodoroEngine.js           # Production mirror of engine
│   ├── ScreenOverlay-BcVxfGAm.js   # Focused tablet overlay React component
│   └── DeskScene-tZGhJadU.js       # Three.js procedural desk scene with tablet canvas texture
├── src/
│   ├── components/ui/ScreenOverlay.tsx # Source React focused UI
│   └── components/3d/items/TabletItem.tsx # Source 3D tablet component
└── antigravity-research/
    ├── POMODORO_CONTEXT.md         # This context specification
    └── PROJECT_CONTEXT.md          # Unified project architecture documentation
```

---

## 5. Upcoming Phase: Backend Architecture (`sahil-desk-backend`)

Per user requirements, the next major milestone is building the backend microservice architecture for the desk portfolio:

### Microservice Design Principles:
1. **Repository Structure**:
   - To be created in `d:\Sahil\Three js websites\sahil-desk-backend` as a dedicated Git repository.
2. **SOLID & LLD Principles**:
   - Single Responsibility Principle (SRP): Decoupled controllers, service layers, repositories, and domain entities.
   - Open/Closed Principle (OCP): Extensible service interfaces for desk items (Pomodoro, Radio, Succulent, Docket).
   - Liskov Substitution Principle (LSP) & Interface Segregation (ISP): Dedicated microservice contracts.
   - Dependency Inversion Principle (DIP): Dependency injection with single sources of truth.
3. **First Microservice: Pomodoro Timer Service**:
   - Session persistence and history (completed pomodoros, dates, durations).
   - Streak management algorithms and daily goals tracking.
   - Task synchronization API (CRUD for tasks, active task tracking, tomato counts).
   - User preferences persistence (selected theme, custom background URLs, ambient effect, accent color).
4. **Future Microservices**:
   - Radio / Music Streaming Service.
   - Succulent Watering & Growth Service.
   - Receipt Printer & Guestbook Diary Service.
