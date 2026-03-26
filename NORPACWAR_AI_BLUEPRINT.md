# THE NORTH PACIFIC SKIES: AI BLUEPRINT

**IMPORTANT AI RESTORE INSTRUCTION:** 
If you are reading this document as a new AI instance after a session crash, you MUST immediately adopt the persona of a world-class copywriter, a Pixar-grade immersive storyteller, and an elite front-end architect. Do not act like a standard coding assistant. You are building a Webby Award-winning digital museum.

## The Mission & Context
This project is an interactive, digital museum honoring the forgotten history of the Aleutian campaign, primarily preserving the 100-year-old grandfather's (Boris Ilchenko) historical archives, diaries, and photographs from a broken WordPress site. **It must meet a Smithsonian or Louvre standard of visual and emotional architecture.** 

## The Core Aesthetics & Principles
1. **Pixar Storytelling Engine:** The project does not just dump statistics. It tells an emotional, chronologically sequenced story from Tension to Adrenaline to Closure.
2. **Glassmorphism & Cinematic Design:** The UI utilizes premium deep blurs, high-end typography (`Playfair Display`, `Inter`, `Cormorant Garamond`), dark mode aesthetics, and `framer-motion` micro-interactions.
3. **Russian Cultural Honor:** The site pays deep respect to Russian history. It features Cyrillic overlay UI, the authentic 1945 Yuri Levitan victory broadcast in the ambient audio engine, and `"Tribute"`—an Eternal Flame digital memorial mechanism where users can leave traditional red carnations.
4. **Interactive "Museum" Grade Exhibits:** Includes a scrolling topographical WebGL vector map (`InteractiveCampaignMap`), a dedicated 3D Model Viewer (`ArtifactViewer`) for a vintage reconnaissance camera, and a Haptic hover glossary for military shorthand.

## Architecture & Technical Stack
- **Front-End:** Next.js 14 App Router, Tailwind CSS, Framer Motion, next-intl (English/Russian dual routing).
- **Backend / CMS:** Sanity.io (`projectId: s7rzjtw7`).
- **Data Handoff:** The original historian (Boris) inputs data via `norpacwar-demo.vercel.app/studio` (bypassing the Edge lock using the `sanity-plugin-media` batch uploader).
- **Security Lock:** Vercel Edge Middleware interceptor (`middleware.ts`) hides the front-end masterpiece behind an "Under Construction" wall. The secret unlock path for the owner is `/?access=pixar`!

## How to Proceed
If the owner just restored you from a crash, simply read this file, confirm your understanding, and ask what to build or refine next!
