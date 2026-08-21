import express from 'express';
import HabitSchema from '../models/habitModels.js';

export const createHabit = async (req,res) =>{
    try {
        const user = req.user;
        
        if(!user){
            return res.status(401).json({message:"User not authorized:"});
        }

        const {name,description} = req.body;

        const newHabit = new HabitSchema(
            {
                user:user.id,
                name:name,
                description:description
            }
        )

        const response = await newHabit.save();

        return res.status(201).json({message:"habit Created Successfully:",response:response});
    } catch (error){
        console.log(error);
        return res.status(500).json({message:"Internal Server Error:"});
    }
}

//get all habits
export const getAllHabits = async (req,res) =>{
    try {
        const user = req.user;

        if(!user){
            return res.status(403).json({message:"Unauthorized:"});
        }

       

        const habits = await HabitSchema.find({user:user.id});

        return res.status(200).json({message:"All habits fetched successfully:",habits});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error:"});
    }
}

//get habit
export const getHabit = async (req,res) =>{
    try {
        const user = req.user;

        if(!user){
            return res.status(403).json({message:"Unauthorized:"});
        }

       const habitId = req.params.id;
        const habit = await HabitSchema.findById(habitId);

        if(!habit){
            return res.status(404).json({message:"Habit Not Found:"});
        }
        return res.status(200).json({message:"Habit fetched successfully:",habit});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error:"});
    }
}
