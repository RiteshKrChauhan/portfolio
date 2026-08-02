# Ritesh Kumar Chauhan - Personal Portfolio

A state-of-the-art, highly interactive personal portfolio website designed and developed to showcase engineering projects, technical skills, and professional experience. Built with a heavy focus on fluid animations, modern aesthetics (glassmorphism), and performance.

## 🚀 Technology Stack

This portfolio leverages a modern React ecosystem to deliver a premium user experience:

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scrolling:** [Lenis](https://lenis.darkroom.engineering/)
- **3D Graphics:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) & Three.js
- **Icons:** [Lucide React](https://lucide.dev/)

## ✨ Key Features & Technical Highlights

- **Custom 3D Backgrounds:** A highly optimized WebGL/Three.js background particle system built with React Three Fiber, reacting dynamically to scroll and mouse events without sacrificing performance.
- **Advanced Physics Animations:** Extensive use of Framer Motion for scroll-linked animations, spring-physics layout transitions, and interactive magnetic hover effects (`MagneticButton`).
- **Interactive Stack Carousel:** A custom-built, gesture-driven project carousel (using `framer-motion`'s `useDrag`) with precise Z-index stacking, scaling offsets, and smooth swipe mechanics.
- **Responsive & Accessible Layout:** Fully optimized for all device sizes (mobile, tablet, and desktop) while maintaining proper accessibility standards.
- **Centralized Data Architecture:** All site content (projects, skills, social links, configuration) is cleanly separated in `src/data/`, allowing for instantaneous content updates without touching the UI component logic.
- **Performance Optimized:** Statically generated and heavily optimized for fast load times, completely eliminating unnecessary re-renders.

## 📂 Project Structure

```text
├── public/                 # Static assets (images, fonts, global icons)
├── src/
│   ├── app/                # Next.js App Router (layout.tsx, page.tsx, globals.css)
│   ├── components/
│   │   ├── layout/         # Global layout wrappers (Navbar, Footer)
│   │   ├── sections/       # Core page sections (Hero, About, Projects, Skills, Contact)
│   │   ├── three/          # WebGL & R3F specific components (Background.tsx)
│   │   └── ui/             # Reusable UI primitives (MagneticButton, CustomCursor, SectionHeading)
│   ├── data/               # Centralized configuration and content records
│   ├── hooks/              # Custom React hooks (e.g., media query tracking)
│   └── lib/                # Utility functions and shared helpers
├── tailwind.config.ts      # Tailwind CSS configuration and custom animations
└── tsconfig.json           # Strict TypeScript configuration
```

## 🛠️ Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deployment

This project is perfectly configured to be deployed on Vercel. 
Simply push to your main branch, link your repository in the Vercel dashboard, and the platform will handle the rest with zero-configuration needed.

## 📄 License & Copyright

**Copyright (c) 2026 Ritesh Kumar Chauhan. All Rights Reserved.**

This repository and its contents are provided solely for viewing and evaluation as part of the author's portfolio. No permission is granted to copy, reproduce, modify, distribute, sublicense, publish, or use this source code, in whole or in part, for any purpose (including personal portfolios or commercial use) without explicit prior written permission from the copyright holder.

The code, architecture, designs, and other project assets are protected by copyright law. See the `LICENSE` file for more details.
