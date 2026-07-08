import { Router } from 'express';
import prisma from '../config/db.js';

const router = Router();

router.get('/', async (req, res) => {
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

router.post('/', async (req, res) => {
  try {
    const { name, category } = req.body;
    if (!name) return res.status(400).json({ message: 'Ingredient name is required' });

    const ingredient = await prisma.userIngredient.create({
      data: { userId: req.userId, name, category },
    });
    res.status(201).json({ ingredient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
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
