import { Router } from 'express';
import OpenAI from 'openai';
import prisma from '../config/db.js';

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/generate', async (req, res) => {
  try {
    const [preferences, ingredients] = await Promise.all([
      prisma.userPreferences.findUnique({ where: { userId: req.userId } }),
      prisma.userIngredient.findMany({ where: { userId: req.userId } }),
    ]);

    const ingredientNames = ingredients.map((i) => i.name).join(', ');

    const prompt = `Generate 3 meals (breakfast, lunch, dinner) for today.

User preferences:
- Cuisines: ${preferences?.cuisines?.join(', ') || 'Any'}
- Dietary restrictions: ${preferences?.dietaryRestrictions?.join(', ') || 'None'}
- Cooking skill: ${preferences?.cookingSkill || 'Beginner'}
- Max cook time per meal: ${preferences?.maxCookTimeMinutes || 30} minutes
- Servings: ${preferences?.servings || 2}
- Goal: ${preferences?.goal || 'Maintain'}

Available ingredients: ${ingredientNames || 'No specific ingredients listed — suggest common ones'}

Return a JSON object with a "meals" array of 3 meals. Each meal should have:
- type (breakfast, lunch, or dinner)
- title
- description (one sentence)
- ingredients (array of {name, quantity, unit})
- instructions (array of {step, text})
- prepTimeMinutes
- cookTimeMinutes
- estimatedCalories
- estimatedProteinG
- cuisine

Return ONLY valid JSON, no other text.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    const parsed = JSON.parse(content);
    const mealsData = parsed.meals || parsed;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const mealPlan = await prisma.mealPlan.create({
      data: {
        userId: req.userId,
        date: today,
        meals: {
          create: mealsData.map((meal) => ({
            type: meal.type,
            title: meal.title,
            description: meal.description,
            ingredients: meal.ingredients,
            instructions: meal.instructions,
            prepTimeMinutes: meal.prepTimeMinutes,
            cookTimeMinutes: meal.cookTimeMinutes,
            estimatedCalories: meal.estimatedCalories,
            estimatedProteinG: meal.estimatedProteinG,
            cuisine: meal.cuisine,
          })),
        },
      },
      include: { meals: true },
    });

    res.json({ mealPlan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to generate meal plan' });
  }
});

router.get('/', async (req, res) => {
  try {
    const mealPlans = await prisma.mealPlan.findMany({
      where: { userId: req.userId },
      include: { meals: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ mealPlans });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const mealPlan = await prisma.mealPlan.findFirst({
      where: { id: req.params.id, userId: req.userId },
      include: { meals: true },
    });
    if (!mealPlan) return res.status(404).json({ message: 'Meal plan not found' });
    res.json({ mealPlan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
