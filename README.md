# Hermes - Travel Journal & Postcards

Hermes is a beautiful web application for documenting your travel experiences through digital journals, custom postcards, and exploration of local lore.

## Features

### 📔 Travel Journal
Create beautiful journal entries to document your travels with photos, text, and more. Keep track of your memories in a scrapbook-inspired format.

### 📮 Custom Postcards
Design and send digital postcards to friends and family. Choose backgrounds, customize messages, and add your personal touch to share your travel experiences.

### 🌍 Local Lores
Discover historical insights, folklore, and local legends from around the world. Save your favorites and expand your knowledge about different destinations.

### 👤 User Profiles
Track your travel activity, including countries visited, postcards sent, and journal entries created. View your journey statistics and travel achievements.

## Technologies

This project is built with:

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Lucide Icons](https://lucide.dev/) - Beautiful open-source icons

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm

### Installation

1. Clone the repository
```sh
git clone https://github.com/yourusername/hermes.git
cd hermes
```

2. Install dependencies
```sh
pnpm install
```

3. Start the development server
```sh
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
hermes/
├── app/                  # Next.js app router pages
│   ├── journal/          # Travel journal feature
│   ├── login/            # Authentication
│   ├── lores/            # Local stories feature
│   ├── postcard/         # Postcard creation
│   └── profile/          # User profile
├── components/           # React components
│   ├── ui/               # Reusable UI components
│   ├── journal-editor.tsx
│   ├── journal-entry.tsx
│   ├── loading-provider.tsx
│   └── ...               # Other components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## Customization

Hermes uses a custom amber/brown theme with a vintage travel aesthetic. The UI includes:

- Custom background textures resembling aged paper
- Handwriting-style fonts for a personal touch
- Scrapbook-inspired design elements
- 3D effects for postcards and interactive elements

## Scripts

```sh
# Development
pnpm dev        # Start development server

# Production
pnpm build      # Build for production
pnpm start      # Start production server

# Maintenance
pnpm lint       # Run ESLint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.