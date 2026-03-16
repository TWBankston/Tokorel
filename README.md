# Tokorel Universe Website

Official website for the Tokorel Series — an epic sci-fi romance saga by Drew Bankston.

## Tech Stack

- **Next.js 16** (React 19, App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Hostinger Reach** for email lead generation

## Getting Started

### Prerequisites

- Node.js 20+ and npm

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Copy the example file and add your Reach API key:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set your `REACH_API_KEY`. See the file for instructions on how to get the key from your Hostinger dashboard.

> **Note:** The site works without the API key — form submissions will still redirect users to the download page, but contacts won't be synced to Reach campaigns.

## Deployment on Hostinger

### Option A: Node.js Hosting (VPS)

1. Upload the project zip to your server
2. Extract the files
3. Run the following commands:

```bash
npm install
npm run build
npm start
```

The site runs on port 3000 by default. Configure your reverse proxy (nginx) to point to it.

### Option B: Static Export (Shared Hosting)

If your hosting doesn't support Node.js server processes, you can export a static version:

1. Add `output: 'export'` to `next.config.ts`
2. Run `npm run build`
3. Upload the contents of the `out/` directory to your hosting

> **Note:** Static export disables the API route. You'll need to submit forms directly to the Reach API from the client side, which exposes the API key. For production, Node.js hosting is recommended.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              Landing page
│   ├── download/page.tsx     Download page (epub + pdf)
│   ├── api/subscribe/route.ts  Form submission -> Reach API
│   └── layout.tsx            Root layout
├── components/
│   ├── ParticleCanvas.tsx    Galaxy particle animation
│   ├── SignupForm.tsx        Name + Email signup form
│   ├── BeamCard.tsx          Glowing border-beam hover effect
│   ├── Header.tsx
│   └── Footer.tsx
└── styles/
    └── globals.css           Tailwind + custom design system

public/
├── images/                   Book covers, characters, nebula bg
├── downloads/                PDF prequel
└── logo/                     Tokorel logo
```

## Hostinger Reach Setup

1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com)
2. Go to **Reach** → **Settings** → **API**
3. Generate a new API key
4. Add it to your `.env.local` file as `REACH_API_KEY`
5. Restart the server

Once configured, every form submission will:
- Create a contact in Reach with the subscriber's name and email
- Redirect the user to the download page
- (Optional) Trigger an automated welcome email via Reach campaigns
