import { Router } from 'express';
import prisma from '../config/db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Get all ingredients for user
router.get('/', authenticate, async (req, res) => {
  try {
    const ingredients = await prisma.userIngredient.findMany({
      where: { userId: req.userId },
      orderBy: { addedAt: 'desc' },
    });

    res.json({ ingredients });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add ingredient
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Ingredient name is required' });
    }

    const ingredient = await prisma.userIngredient.create({
      data: { userId: req.userId, name, category },
    });

    res.status(201).json({ ingredient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete ingredient
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await prisma.userIngredient.deleteMany({
      where: { id: req.params.id, userId: req.userId },
    });

    res.json({ message: 'Ingredient removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
