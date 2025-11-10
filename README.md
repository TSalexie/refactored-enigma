# Productivity App

A world-class productivity application combining the best of Todoist and Notion, with AI-powered goal planning.

## Features

### 🎯 Task Management (Todoist-inspired)
- Projects and tasks with priorities
- Subtasks and hierarchical organization
- Due dates and labels
- Multiple views and filters

### 📝 Rich Content (Notion-inspired)
- Rich text editing with Tiptap
- Nested pages and hierarchical organization
- Custom databases with multiple views (Table, Board, List, Calendar, Gallery)
- Blocks-based content structure
- Kanban boards

### 🤖 AI-Powered Reverse Calendar
- Claude AI integration for intelligent goal planning
- Guided questionnaire to understand user context
- Automatic milestone and task generation
- Weekly breakdown and progress tracking
- Success metrics and risk assessment

### 💰 Subscription Management
- RevenueCat integration
- Multiple tiers (Free, Pro, Enterprise)
- Seamless in-app purchases

### 🔄 Real-time Synchronization
- Hasura GraphQL subscriptions
- Instant updates across devices
- Optimistic UI updates

## Tech Stack

### Frontend
- **Web**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Mobile**: React Native, Expo, TypeScript
- **UI Libraries**: Radix UI (web), Tamagui (mobile)
- **State Management**: React Query, Zustand
- **Rich Text**: Tiptap (web), custom editor (mobile)

### Backend
- **Server**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **GraphQL**: Hasura
- **Auth**: Supabase Auth
- **AI**: Claude API (Anthropic)
- **Subscriptions**: RevenueCat
- **Hosting**: Railway

### Monorepo
- **Build System**: Turborepo
- **Package Manager**: Yarn Workspaces

## Project Structure

```
productivity-app/
├── apps/
│   ├── web/              # Next.js web application
│   ├── mobile/           # React Native Expo app
│   └── backend/          # Node.js/Express API server
├── packages/
│   ├── shared/           # Shared types and utilities
│   ├── api-client/       # GraphQL client and queries
│   ├── ui/               # Shared UI components
│   └── config/           # Shared configuration
├── database/
│   ├── migrations/       # Database migration scripts
│   └── hasura/          # Hasura configuration
├── package.json
├── turbo.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn 1.22+
- PostgreSQL
- Supabase account
- Railway account
- RevenueCat account
- Claude API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd productivity-app
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:

**Backend** (`apps/backend/.env`):
```bash
cp apps/backend/.env.example apps/backend/.env
# Edit .env with your credentials
```

**Web** (`apps/web/.env.local`):
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_HASURA_ENDPOINT=your-hasura-endpoint
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Mobile** (`apps/mobile/.env`):
```bash
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
EXPO_PUBLIC_HASURA_ENDPOINT=your-hasura-endpoint
EXPO_PUBLIC_API_URL=http://localhost:3001
EXPO_PUBLIC_REVENUECAT_API_KEY=your-revenuecat-key
```

4. Set up the database:
```bash
# Run migrations on your PostgreSQL database
psql -U postgres -d your-database -f database/migrations/001_initial_schema.sql
```

5. Start development servers:

```bash
# Start all services
yarn dev

# Or start individually:
yarn web        # Web app on http://localhost:3000
yarn mobile     # Mobile app
yarn backend    # Backend API on http://localhost:3001
```

## Database Setup

### Supabase Setup

1. Create a new Supabase project
2. Run the migration script in the SQL editor
3. Enable Row Level Security (RLS) on all tables
4. Copy your Supabase URL and anon key

### Hasura Setup

1. Deploy Hasura on Railway or Hasura Cloud
2. Connect to your PostgreSQL database
3. Track all tables
4. Set up permissions based on user roles
5. Configure environment variables

## Deployment

### Backend (Railway)

1. Create a new Railway project
2. Connect your GitHub repository
3. Add environment variables
4. Deploy automatically on push

### Web (Vercel)

```bash
cd apps/web
vercel --prod
```

### Mobile (App Stores)

```bash
# iOS
cd apps/mobile
eas build --platform ios

# Android
eas build --platform android
```

## Architecture

### Authentication Flow
1. User signs up/logs in via Supabase Auth
2. JWT token issued by Supabase
3. Token used for Hasura GraphQL queries
4. Token validated in backend API endpoints

### Data Flow
1. **Client** → GraphQL queries/mutations → **Hasura** → **PostgreSQL**
2. **Client** → REST API → **Backend** → **Claude API**
3. **RevenueCat** → Webhook → **Backend** → **PostgreSQL**

### Real-time Updates
- Hasura GraphQL subscriptions for live data
- WebSocket connection for instant synchronization
- Optimistic UI updates for better UX

## Features Roadmap

- [x] Monorepo setup with Turborepo
- [x] Next.js web application
- [x] React Native mobile application
- [x] Shared packages (types, API client)
- [x] Node.js backend with Express
- [x] PostgreSQL database schema
- [x] Claude API integration for reverse calendar
- [ ] Supabase authentication UI
- [ ] RevenueCat subscription flow
- [ ] Task management UI components
- [ ] Rich text editor integration
- [ ] Notion-like pages and blocks
- [ ] Database views (Table, Kanban, etc.)
- [ ] Real-time synchronization
- [ ] Railway deployment
- [ ] Mobile app deployment
- [ ] Comprehensive testing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Proprietary - All rights reserved

## Support

For support, email support@yourapp.com or join our Discord community.
