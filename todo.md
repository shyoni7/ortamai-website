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

## Brand Update
- [x] Upload ORTAM AI logo to CDN
- [x] Replace text logo in Navbar with logo image
- [x] Update brand colors to dark navy (#1B2A4A) and orange (#F5A623) in index.css
- [x] Update all cyan/purple accent references to orange across components
- [x] Update gradient backgrounds to use navy/orange palette

## Mobile Responsive Fixes
- [x] Add global overflow-x: hidden to prevent horizontal scroll on mobile
- [x] Fix Navigation: nav bar overflow on small screens, hamburger menu layout
- [x] Fix Home hero: 3D spheres causing overflow, text sizing, button layout on mobile
- [x] Fix Home pillars section: HologramCube cards on mobile
- [x] Fix Incubator hero: flex row → column stack on mobile, fixed 190px atom sphere
- [x] Fix Placement hero: inline styles with fixed min-widths causing overflow on mobile
- [x] Fix Academy page: mobile layout audit and fixes
- [x] Fix Contact page: single viewport fit on mobile
- [x] Fix Partners grid: ensure 2-col on mobile looks good
- [x] Fix all large text sizes (text-4xl/5xl) to be smaller on mobile
- [x] Fix btn-secondary padding (px-8 py-4) to be smaller on mobile
- [x] Fix WhatsApp and Accessibility buttons: smaller on mobile, adjusted position
- [x] Fix Placement CV form: responsive padding on upload area
- [x] Fix ManusDialog: responsive width on mobile
- [x] Fix AccessibilityStatement: reduce py-32 and text-5xl for mobile
- [x] Fix About hero: reduce py-32 and text-5xl for mobile
- [x] Fix GradientButton: responsive padding on mobile

## Color Redesign - Purple → Dark Blue-Gray-Silver
- [x] Replace purple in index.css (CSS variables, gradients, utility classes)
- [x] Replace purple in Navigation.tsx
- [x] Replace purple in GradientButton.tsx
- [x] Replace purple in HologramCube.tsx
- [x] Replace purple in Home.tsx
- [x] Replace purple in Incubator.tsx
- [x] Replace purple in Academy.tsx
- [x] Replace purple in Placement.tsx
- [x] Replace purple in About.tsx
- [x] Replace purple in Contact.tsx
- [x] Replace purple in Footer.tsx
- [x] Replace purple in WhatsAppButton.tsx
- [x] Replace purple in AccessibilityWidget.tsx

## Mobile Hero Polish (Round 2)
- [x] Home: hero fits in first viewport on mobile, no overflow
- [x] About: hero fits in first viewport on mobile
- [x] Incubator: hero fits in first viewport on mobile
- [x] Academy: hero fits in first viewport on mobile
- [x] Placement: hero fits in first viewport on mobile
- [x] Contact: hero fits in first viewport on mobile
- [x] Global: nav height consistent, no elements hidden behind nav
- [x] Global: all section paddings tightened for mobile

## Full Site Obsidian + Platinum Redesign
- [x] Update global CSS (index.css) with Obsidian + Platinum tokens
- [x] Update Navigation with dark/transparent hero + white scroll behavior
- [x] Update Footer with obsidian black background
- [x] Rewrite Incubator page with new palette
- [x] Rewrite Academy page with new palette
- [x] Rewrite Placement page with new palette
- [x] Rewrite About page with new palette
- [x] Rewrite Contact page with new palette
- [x] Update AccessibilityStatement page
- [x] Update NotFound page
- [x] Update PrivacyPolicy page
- [x] Fix HologramCube old blue face gradients

## Accessibility Widget Full Panel
- [x] Build full accessibility panel with all controls (matching screenshot)
- [x] Add toggle rows: ניגודיות מוקדמת, ביטול אנימציות, Contrast
- [x] Add font size +/- control with percentage display
- [x] Add toggle rows: נטוי קריא, סימון כותרות, סימון קישורים והיצמדים
- [x] Add links to הצהרת נגישות and מפת האתר
- [x] Add אפס הגדרות נגישות reset button
- [x] Persist preferences to localStorage
- [x] Apply CSS classes to <html> for each accessibility feature
- [x] Add CSS rules for a11y-high-contrast, a11y-no-animations, a11y-bold-text, a11y-mark-headings, a11y-mark-links
- [x] RTL Hebrew panel layout with white background matching screenshot

## Pillars Section – Metallic Spheres
- [x] Create MetallicSphere component (obsidian / platinum / pearl variants)
- [x] Float animation (sine wave up/down)
- [x] Equatorial ring spin (CSS 3D perspective)
- [x] Particle dots emanating upward from sphere surface
- [x] Ground shadow that pulses with the float
- [x] Replace HologramCube in Home.tsx pillars with MetallicSphere
- [x] Assign obsidian → Accelerator, platinum → Academy, pearl → Placement

## SEO Improvements

- [x] Install react-helmet-async and wrap app in HelmetProvider
- [x] Create shared SEO component with title, description, canonical, OG tags, Twitter Card, JSON-LD
- [x] Add unique title + meta description to Home page (Hebrew + English)
- [x] Add unique title + meta description to About page
- [x] Add unique title + meta description to Incubator page
- [x] Add unique title + meta description to Academy page
- [x] Add unique title + meta description to Placement page
- [x] Add unique title + meta description to Contact page
- [x] Create seoSchemas.ts with Organization, WebSite, Service, Course, ContactPage JSON-LD
- [x] Add Organization + WebSite schema to Home page
- [x] Add Service schema to Incubator page
- [x] Add EducationalOrganization + Course schema to Academy page
- [x] Add Service schema to Placement page
- [x] Add ContactPage schema to Contact page
- [x] Create sitemap.xml in client/public with all public pages + hreflang
- [x] Create robots.txt with Sitemap reference and admin/api disallow rules
- [x] Add noindex to ComponentShowcase (internal dev page)
