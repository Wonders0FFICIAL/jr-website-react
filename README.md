# JR. website (React + Vite + TypeScript)

## Run
    npm install
    npm run dev

## Forms (waitlist + contact)
Create a Formspree-style form for each and set (in `.env.local` and in Vercel → Environment Variables):

    VITE_WAITLIST_ENDPOINT=https://formspree.io/f/xxxx
    VITE_CONTACT_ENDPOINT=https://formspree.io/f/yyyy

Without them the forms show an honest error instead of pretending to send.

## Edit content
- Products, status, taglines: `src/data/products.ts`
- Social links, nav: `src/data/site.ts`
- Privacy page is a plain-language DRAFT: have it reviewed before launch.

## Deploy
Vercel detects Vite. `vercel.json` handles SPA routing and redirects of old URLs.
# jr-website-react
