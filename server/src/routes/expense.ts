import express from 'express';
import { body } from 'express-validator/check';
import User from '../models/User';
import isAuth from '../middleware/isAuth';
import { addExpense, deleteExpense } from '../controllers/expense';
const router = express.Router();

router.post(
  '/add-expense',
  [
    body('title', 'Please enter title that is at lest 4 characters long.')
      .isLength({ min: 12 })
      .isAlphanumeric()
      .trim()
      .escape(),
    body(
      'description',
      'Please enter title that is at lest 20 characters long.',
    )
      .isLength({ min: 20 })
      .isAlphanumeric()
      .trim()
      .escape(),
    body('cost', 'Please enter valid number')
      .isLength({ min: 1 })
      .isNumeric()
      .trim()
      .escape(),
  ],
  addExpense,
);
router.delete('/delete/expense/:expenseId', isAuth, deleteExpense);
export default router;