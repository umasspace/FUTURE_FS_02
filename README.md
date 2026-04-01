# Wafflewala - Love at First Bite! 🧇

A delightful and energetic digital menu and brand showcase for Wafflewala, featuring a playful design, signature waffle categories, and location details.

## Features

- **Digital Menu** - Browse signature waffle categories with descriptions and pricing
- **Shopping Cart** - Add items to cart with persistent localStorage
- **Our Story** - Brand story and background
- **Photo Gallery** - Showcase of Wafflewala's offerings
- **Admin Panel** - Manage menu, branches, gallery, and app configuration
- **Multi-Branch Support** - View multiple Wafflewala locations
- **Responsive Design** - Works seamlessly across all devices
- **Freshly Baked, Premium Chocolate, Pocket Friendly** - Core brand values highlighted

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Routing:** React Router v7
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Storage:** localStorage

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero and highlights |
| Menu | `/menu` | Browse waffle categories and add to cart |
| Our Story | `/story` | Brand story and background |
| Gallery | `/gallery` | Photo gallery |
| Admin | `/admin` | Admin dashboard to manage content |
| Terms | `/terms` | Terms and conditions |
| Privacy | `/privacy` | Privacy policy |

## Run Locally

**Prerequisites:** Node.js

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm run dev
   ```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run TypeScript type checking |
| `npm run preview` | Preview production build |

## Project Structure

```
├── components/       # Reusable React components
├── pages/            # Page components (Home, Menu, Story, etc.)
├── providers/        # React context providers
├── App.tsx           # Main app component with routing
├── constants.tsx     # App constants and configuration
├── defaults.ts       # Default data for menu, branches, gallery
├── types.ts          # TypeScript type definitions
└── vite.config.ts    # Vite configuration
```
