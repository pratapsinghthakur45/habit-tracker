import express from 'express';
import jwtAuth from "../middlewares/jwtAuth.js";
import { register } from "../conrollers/userController.js";

const router = express.Router();

router.post('/register',register);

export default router;
