import express from 'express';
import jwtAuth from "../middlewares/jwtAuth.js";
import { register,login } from "../conrollers/userController.js";

const router = express.Router();

router.post('/register',register);

router.post('/login',login);

export default router;
