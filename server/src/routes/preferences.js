import { Router } from 'express';
import prisma from '../config/db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Get preferences
router.get('/', authenticate, async (req, res) => {
  try {
    const preferences = await prisma.userPreferences.findUnique({
      where: { userId: req.userId },
    });

    res.json({ preferences });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update preferences
router.put('/', authenticate, async (req, res) => {
  try {
    const { cuisines, dietaryRestrictions, cookingSkill, maxCookTimeMinutes, servings, goal } = req.body;

    const preferences = await prisma.userPreferences.upsert({
      where: { userId: req.userId },
      update: { cuisines, dietaryRestrictions, cookingSkill, maxCookTimeMinutes, servings, goal },
      create: { userId: req.userId, cuisines, dietaryRestrictions, cookingSkill, maxCookTimeMinutes, servings, goal },
    });

    res.json({ preferences });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
