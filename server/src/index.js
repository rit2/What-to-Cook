import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import preferencesRoutes from './routes/preferences.js';
import ingredientsRoutes from './routes/ingredients.js';
import mealPlanRoutes from './routes/mealPlans.js';
import mealRoutes from './routes/meals.js';
import groceryListRoutes from './routes/groceryLists.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    process.env.CLIENT_URL,
  ].filter(Boolean),
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/preferences', preferencesRoutes);
app.use('/api/ingredients', ingredientsRoutes);
app.use('/api/meal-plans', mealPlanRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/grocery-lists', groceryListRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
