import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';

export const register = async (req,res) => {
          try {
            const data = req.body;

            const userExist = await User.findOne({email:data.email});

            if(userExist){
                  return res.status(401).json({message:"Email aleready exist try with new email:"});
            }
            data.password = await bcryptjs.hash(data.password,10);
            const newUser = new User(data);
            const response = await newUser.save();

            //token creation
            const token = jwt.sign(
                {
                    id:response._id
                },
                 process.env.JWT_SECRET,
                {
                   expiresIn:"1h"
                }
            )

            return res.status(201).json({message:"User register Successfully:",response:response,token:token});
          } catch (error) {
              console.log(error);
          }
}