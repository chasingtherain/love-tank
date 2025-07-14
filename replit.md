# Love Tank Application

## Overview

Love Tank is a relationship health tracking application built as a **static React application** for deployment to GitHub Pages and other static hosting services. It allows users to make daily "deposits" and "withdrawals" to track their emotional connection with their partner based on the five love languages. The app features a visual love tank that fills or empties based on relationship activities, helping couples maintain awareness of their emotional well-being.

## User Preferences

Preferred communication style: Simple, everyday language.
Deployment preference: Static hosting (GitHub Pages, Netlify, Vercel) - NO server dependencies.

## System Architecture

The application is a **single-page static React application** with no backend dependencies:

### Frontend Architecture
- **Framework**: React 18 via CDN (no build process required)
- **Styling**: Vanilla CSS with modern responsive design
- **Storage**: Browser localStorage for data persistence
- **Structure**: Single HTML file with embedded React components
- **Size**: ~15KB total application size
- **Dependencies**: None (uses React CDN links)

## Key Components

### Authentication System
- Context-based authentication using React Context
- Local storage for user session persistence
- Simple registration and login flow
- User profile management

### Love Tank System
- Visual representation of relationship health (0-100 scale)
- Animated tank that fills/empties based on score
- Score calculation: +1 for deposits, -5 for withdrawals
- Relationship status indicators based on score ranges

### Transaction System
- Deposit transactions linked to love languages
- Withdrawal transactions with required comments
- Date-based transaction tracking
- Transaction history and filtering

### Love Languages Integration
- Five love languages support: Words of Affirmation, Quality Time, Physical Touch, Acts of Service, Receiving Gifts
- Love language selection for deposit transactions
- Formatted display of love language names

## Data Flow

1. **User Authentication**: Users register or login, with data stored in local storage
2. **Transaction Creation**: Users create deposits (with love language) or withdrawals (with comments)
3. **Score Calculation**: Each transaction updates the user's love tank score
4. **Real-time Updates**: UI reflects changes immediately through React Context
5. **Data Persistence**: All data is stored locally using localStorage service

## External Dependencies

### UI and Styling
- Radix UI primitives for accessible components
- Tailwind CSS for utility-first styling
- Framer Motion for animations
- Lucide React for icons

### Database and Backend
- Drizzle ORM for type-safe database operations
- Neon Database for serverless PostgreSQL
- Express.js for REST API endpoints
- Connect-pg-simple for session management

### Development Tools
- Vite for development server and build tooling
- TypeScript for type safety
- ESBuild for production bundling
- Replit-specific plugins for development environment

## Deployment Strategy

The application is designed for deployment on Replit with the following structure:

### Development Mode
- Vite development server for frontend hot reloading
- Express server with TypeScript execution via tsx
- Automatic database schema synchronization with Drizzle
- Cartographer integration for Replit-specific features

### Production Build
- Frontend built to `dist/public` directory
- Backend bundled with ESBuild to `dist/index.js`
- Static file serving from Express
- Environment variable configuration for database connection

### Database Management
- Drizzle migrations in `./migrations` directory
- Schema defined in `./shared/schema.ts`
- PostgreSQL database with connection via DATABASE_URL environment variable
- Database push command for schema updates: `npm run db:push`

The application uses a monorepo structure with shared TypeScript interfaces between client and server, ensuring type safety across the full stack.