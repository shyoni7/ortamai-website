# ORTAM AI Website Rebuild - TODO

## Core Setup
- [x] Initialize new React/Vite project with Tailwind CSS 4
- [x] Upgrade to full-stack (tRPC + DB + Auth)
- [x] Upload all images to CDN
- [x] Create LanguageContext (Hebrew/English bilingual)
- [x] Create design system (futuristic "AI Horizon" theme)
- [x] Create Navigation component
- [x] Create Footer component
- [x] Create Layout component

## Backend
- [x] Add contact form submission tRPC procedure
- [x] Add DB schema for contact submissions
- [x] Add owner notification on form submit

## Pages
- [x] Home page - full rebuild (Hero, Stats, Pillars, ValueProps, ProcessSteps, Partners, CTA)
- [x] About page (Team, Vision, Mission, Values)
- [x] Incubator/Accelerator page
- [x] Academy/Training page
- [x] Placement page
- [x] Contact page with working form
- [x] Accessibility Statement page
- [x] Privacy Policy page

## Components
- [x] WhatsApp floating button (with ripple animation, inline SVG)
- [x] Stats counter animation section
- [x] Partner logos section
- [x] Accessibility widget (toolbar)
- [x] Process steps / timeline
- [x] Hero video section (optional - no video file in original, skipped by design)

## Routing
- [x] Wire all routes in App.tsx

## Tests
- [x] Contact form submission test (5 tests passing)
- [x] Auth logout test (1 test passing)

## Deployment
- [x] Push final code to GitHub (shyoni7/ortamai-website)
- [x] Deploy to Vercel (use Manus Publish button - full-stack app requires server hosting, not static Vercel)

## Placement Page Enhancement
- [x] Add cv_submissions DB table (name, email, phone, role, field, cv_url, message)
- [x] Add S3 CV file upload tRPC procedure
- [x] Add CV submission tRPC procedure with owner notification
- [x] Build CV submission form UI on Placement page (file upload + personal details)
- [x] Add vitest tests for CV submission backend
