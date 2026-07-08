import { Router } from 'express';
import prisma from '../config/db.js';

const router = Router();

router.post('/generate', async (req, res) => {
  try {
    const latestPlan = await prisma.mealPlan.findFirst({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' },
      include: { meals: true },
    });

    if (!latestPlan) {
      return res.status(400).json({ message: 'No meal plan found. Generate one first.' });
    }

    const ingredientMap = new Map();

    for (const meal of latestPlan.meals) {
      const mealIngredients = meal.ingredients || [];
      for (const ing of mealIngredients) {
        const key = `${ing.name}-${ing.unit}`;
        if (ingredientMap.has(key)) {
          const existing = ingredientMap.get(key);
          existing.quantity = String(Number(existing.quantity) + Number(ing.quantity));
        } else {
          ingredientMap.set(key, { ...ing, checked: false });
        }
      }
    }

    const items = Array.from(ingredientMap.values());

    const groceryList = await prisma.groceryList.create({
      data: {
        userId: req.userId,
        mealPlanId: latestPlan.id,
        items,
      },
    });
    res.json({ groceryList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const groceryList = await prisma.groceryList.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!groceryList) return res.status(404).json({ message: 'Grocery list not found' });
    res.json({ groceryList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { items } = req.body;
    const groceryList = await prisma.groceryList.update({
      where: { id: req.params.id },
      data: { items },
    });
    res.json({ groceryList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
