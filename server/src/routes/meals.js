import { Router } from 'express';
import prisma from '../config/db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Toggle favorite
router.patch('/:id/favorite', authenticate, async (req, res) => {
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

// Get all favorites
router.get('/favorites', authenticate, async (req, res) => {
  try {
    const meals = await prisma.meal.findMany({
      where: {
        isFavorite: true,
        mealPlan: { userId: req.userId },
      },
      orderBy: { mealPlan: { createdAt: 'desc' } },
    });

    res.json({ meals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
