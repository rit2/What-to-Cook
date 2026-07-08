# 🍳 What To Cook

An AI-powered meal planner that generates personalized daily recipes based on your available ingredients, cuisine preferences, dietary restrictions, and nutrition goals.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite) + Tailwind CSS |
| Backend | Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT + bcrypt |
| AI | OpenAI API (GPT-4o-mini) |

## Features

- User authentication (register/login)
- Set cuisine, dietary, and nutrition preferences
- Add/remove ingredients on hand
- AI-generated daily meal plans (breakfast, lunch, dinner)
- Recipe details with ingredients, instructions, and macros
- Auto-generated grocery lists from meal plans
- Save favorite recipes

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or use [Neon](https://neon.tech) / [Supabase](https://supabase.com) free tier)
- OpenAI API key

### Setup

1. Clone the repo

```bash
git clone <your-repo-url>
cd what-to-cook
```

2. Set up the server

```bash
cd server
cp .env.example .env
# Edit .env with your DATABASE_URL, JWT_SECRET, and OPENAI_API_KEY
npm install
npx prisma migrate dev --name init
npm run dev
```

3. Set up the client

```bash
cd client
npm install
npm run dev
```

4. Open http://localhost:5173

## Project Structure

```
what-to-cook/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Auth context
│   │   ├── pages/         # Route pages
│   │   └── utils/         # Helper functions
│   └── ...
├── server/                # Express backend
│   ├── prisma/            # Database schema
│   └── src/
│       ├── config/        # DB connection
│       ├── middleware/    # Auth middleware
│       └── routes/        # API routes
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Log in |
| GET | /api/auth/me | Get current user |
| GET | /api/preferences | Get preferences |
| PUT | /api/preferences | Update preferences |
| GET | /api/ingredients | List ingredients |
| POST | /api/ingredients | Add ingredient |
| DELETE | /api/ingredients/:id | Remove ingredient |
| POST | /api/meal-plans/generate | Generate AI meal plan |
| GET | /api/meal-plans | List meal plans |
| PATCH | /api/meals/:id/favorite | Toggle favorite |
| GET | /api/meals/favorites | Get favorites |
| POST | /api/grocery-lists/generate | Generate grocery list |
| PATCH | /api/grocery-lists/:id | Update grocery list |

## License

MIT
