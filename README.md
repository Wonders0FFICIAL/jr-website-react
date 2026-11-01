# JR. website (React + Vite + TypeScript)

Live at https://jrofficial.org

## Run it
    npm install
    npm run dev          # local development
    npm run build        # typecheck, build, prerender every page into dist/

`npm run build` renders each page to real HTML (so Google, Discord and X can read it) and writes
`sitemap.xml`. Vercel runs this automatically on every push.

## Make the forms work (waitlist + contact)
1. Create a free account at https://formspree.io and confirm your email.
2. Create two forms: "JR. Waitlist" and "JR. Contact". Each gets an endpoint like `https://formspree.io/f/abcdwxyz`.
3. In Vercel: Project, Settings, Environment Variables. Add (for Production, Preview and Development):

       VITE_WAITLIST_ENDPOINT = https://formspree.io/f/<waitlist id>
       VITE_CONTACT_ENDPOINT  = https://formspree.io/f/<contact id>

4. Redeploy (Deployments, three dots on the latest, Redeploy). Values are baked in at build time, so
   changing them always needs a redeploy.
5. Submit each form once on the live site to test it. Submissions appear in the Formspree dashboard and
   are emailed to you. The waitlist can be exported as CSV from there.

For local testing, copy `.env.example` to `.env.local` and fill in the same two values.

## Edit content
- Products, taglines, status: `src/data/products.ts`
- Social links and nav: `src/data/site.ts`
- Page titles and descriptions: `src/seo.ts`
- Concept screens in the hero and on Products: `src/components/ProductWindow.tsx`
- Legal pages: `src/pages/Privacy.tsx`, `src/pages/Terms.tsx` (have them reviewed before relying on them)

## Domain
Add `jrofficial.org` and `www.jrofficial.org` under Vercel, Settings, Domains, and set `www` to redirect to the
apex domain. Then submit `https://jrofficial.org/sitemap.xml` in Google Search Console.

Built with passion and coffee by Wonders ❤️☕
