# Sahil Desk — 100% Faithful Clone of PradipLabs.dev

A faithful, high-fidelity replication of [pradiplabs.dev](https://www.pradiplabs.dev/) built with Three.js, React, WebGL, and Tailwind CSS, reverse-engineered using REA (Reverse Engineer Anything).

---

## 🚀 Quick Start

```bash
# 1. Navigate to project folder
cd "d:\Sahil\Three js websites\sahil_desk"

# 2. Start the development server
npm run dev
```

Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 🌟 Features & Reverse-Engineered Mechanics

### 1. Pure Procedural 3D Environment (Zero Heavy 3D Model Downloads)
- **Procedural Oak Desk**: Generated on a 2048x1024 canvas using a Mulberry32 PRNG with 26 color gradient bands and 340 distinct sinusoidal grain lines.
- **Titanium Business Card**: Canvas-rendered horizontal anisotropic brushed titanium grain with etched typography.
- **Sleeping Cat**: Curled egg-fur procedural spheres with tabby stripes and a 10-link segmented tail that sways over the desk edge at 12fps.
- **Cantilever Desk Lamp**: Real-time spotlight and warm/cool color temperature shifts.
- **Thermal Receipt Printer**: Animates moving paper extrusion that curls onto the desk when an invoice is printed from the tablet.
- **MacBook Pro**: Aluminum beveled chassis, glass screen, keyboard well, and interactive project showcase.
- **Zoro Bobblehead**: Chibi figure on a spring neck with real-time harmonic oscillation physics on hover/click.
- **Coffee Mug**: Ceramic mug with interactive sip counter and rising steam particle wisps.

### 2. Sydney Astronomical Solar System (`src/lib/sydneySun.ts`)
Calculates the exact sunrise and sunset times in Sydney, Australia. The room dynamically transitions between bright daylight and warm evening lighting with tungsten lamp illumination.

### 3. Integrated Mock API Engine (`vite.config.ts`)
Runs completely offline without external databases or backend services:
- `/api/receipts` — Itemized Docket invoices for the thermal printer.
- `/api/plant` — Live watering counter and leaf growth.
- `/api/diary` — Guestbook entries and handwritten doodles.
- `/api/poll` — Interactive community poll with voting.
- `/api/feed` — Cat feeding wall with real visitor notes.

---

## 🛠️ Architecture & SOLID Principles

- **Single Responsibility Principle (SRP)**: Geometries, canvas textures, lighting, camera controllers, and UI dialogs are isolated in distinct modules (`src/components/3d/`).
- **Open/Closed Principle (OCP)**: New 3D objects can be placed on the desk by registering them in `src/components/3d/core/DeskLayout.ts` without modifying existing mesh components.
- **Dependency Inversion Principle (DIP)**: Components connect through the reactive state store (`src/store/deskStore.ts`).
