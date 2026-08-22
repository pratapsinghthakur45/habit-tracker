import express from 'express';
import jwtAuth from "../middlewares/jwtAuth.js";
import { createHabit,deleteHabit,getAllHabits, getHabit, updateHabit } from '../conrollers/habitController.js';
import { get } from 'mongoose';
import { jwt } from 'zod';
import { checkIn } from '../conrollers/checkInController.js';

const router = express.Router();

router.post('/habit',jwtAuth,createHabit);

router.get('/habits',jwtAuth,getAllHabits);

router.get('/habits/:id',jwtAuth,getHabit);

router.delete('/habits/:id',jwtAuth,deleteHabit);

router.put('/habits/:id',jwtAuth,updateHabit);

router.post('/habits/:id/checkIn',jwtAuth,checkIn);

export default router;