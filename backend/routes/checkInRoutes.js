import express from 'express';
import jwtAuth from "../middlewares/jwtAuth.js";
import { checkIn, getCheckIn } from '../conrollers/checkInController.js';

const router = express.Router();



router.post('/habits/:id/checkIn',jwtAuth,checkIn);

router.get('/habits/:id/checkIn',jwtAuth,getCheckIn);
router.delete('/habits/:id/checkIn/:id',jwtAuth,getCheckIn);
export default router;