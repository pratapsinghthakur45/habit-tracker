import express from 'express';
import jwtAuth from "../middlewares/jwtAuth.js";
import { checkIn, deleteCheckIn, getCheckIn } from '../conrollers/checkInController.js';

const router = express.Router();



router.post('/habits/:id/checkIn',jwtAuth,checkIn);

router.get('/habits/:id/checkIn',jwtAuth,getCheckIn);
router.delete('/habits/:habitId/checkIn/:checkInId',jwtAuth,deleteCheckIn);

export default router;