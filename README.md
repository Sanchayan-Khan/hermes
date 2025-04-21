# Hermes - Travel Journal & Postcards

Hermes is an attractive web application for documenting your travel experiences through digital journals, custom postcards, and exploration of local lore.

## Features

### 📔 Travel Journal
Create beautiful journal entries to document your travels with photos, text, and more. Keep track of your memories in a scrapbook-inspired format.

### 📮 Custom Postcards
Design and send digital postcards to friends and family. Choose backgrounds, customize messages, and add your personal touch to share your travel experiences.

### 🌍 Local Lores
Discover historical insights, folklore, and local legends from around the world. Save your favorites and expand your knowledge about different destinations.

### 👤 User Profiles
Track your travel activity, including countries visited, postcards sent, and journal entries created. View your journey statistics and travel achievements.

## Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Lucide Icons](https://lucide.dev/) - Beautiful open-source icons
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

### Backend
- Node.js & Express.js - Server framework
- PostgreSQL - Database (with Sequelize ORM)
- JWT - Authentication
- Brevo - Email service for OTP verification
- bcrypt - Password hashing

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- PostgreSQL database
- npm or pnpm

### Installation

1. Clone the repository
```sh
git clone https://github.com/yourusername/hermes.git
cd hermes
```

2. Install dependencies for both frontend and backend
```sh
# Frontend
cd frontend
pnpm install

# Backend
cd ../backend
npm install
```

3. Set up environment variables
```sh
# Backend .env
DATABASE_URL=your_postgres_url
JWT_SECRET=your_jwt_secret
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_sender_email

# Frontend .env
NEXT_PUBLIC_API_URL=your_backend_url
```

4. Start the development servers
```sh
# Backend
npm run dev

# Frontend
cd ../frontend
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
hermes/
├── backend/                # Node.js backend
│   ├── config/            # Database configuration
│   ├── middleware/        # Auth middleware
│   ├── models/            # Sequelize models
│   ├── routes/           # API routes
│   └── services/         # External services (email, etc.)
├── frontend/
│   ├── app/              # Next.js app router pages
│   │   ├── journal/      # Travel journal feature
│   │   ├── login/        # Authentication
│   │   ├── lores/        # Local stories feature
│   │   ├── postcard/     # Postcard creation
│   │   └── profile/      # User profile
│   ├── components/       # React components
│   │   ├── ui/           # Reusable UI components
│   │   └── ...          # Feature components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── public/          # Static assets
```

## Authentication Flow

1. User signs up with email, username, and password
2. OTP is sent to user's email via Brevo
3. User verifies email with OTP
4. User can then log in with email/username and password
5. JWT token is used for authenticated requests

## User Roles

- REGULARS - Standard users
- PROFESSIONALS - Verified travel professionals
- NATIVES - Local residents and cultural experts

## Customization

Hermes uses a custom amber/brown theme with a vintage travel aesthetic. The UI includes:

- Custom background textures resembling aged paper
- Handwriting-style fonts for a personal touch
- Scrapbook-inspired design elements
- 3D effects for postcards and interactive elements

## Deployment

- Frontend: Deployed on Vercel
- Backend: Deployed on Render
- Database: PostgreSQL hosted on Render
