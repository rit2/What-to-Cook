import { Router } from 'express';
import prisma from '../config/db.js';

const router = Router();

router.patch('/:id/favorite', async (req, res) => {
  try {
    const meal = await prisma.meal.findFirst({
      where: { id: req.params.id },
      include: { mealPlan: true },
    });

    if (!meal || meal.mealPlan.userId !== req.userId) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    const updated = await prisma.meal.update({
      where: { id: req.params.id },
      data: { isFavorite: !meal.isFavorite },
    });
    res.json({ meal: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/favorites', async (req, res) => {
  try {
    const meals = await prisma.meal.findMany({
      where: {
        isFavorite: true,
        mealPlan: { userId: req.userId },
      },
    });
    res.json({ meals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
