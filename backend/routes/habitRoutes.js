import express from 'express';
import jwtAuth from "../middlewares/jwtAuth.js";
import { createHabit,getAllHabits, getHabit } from '../conrollers/habitController.js';
import { get } from 'mongoose';

const router = express.Router();

router.post('/habit',jwtAuth,createHabit);

router.get('/habits',jwtAuth,getAllHabits);

router.get('/habit/:id',jwtAuth,getHabit);

export default router;