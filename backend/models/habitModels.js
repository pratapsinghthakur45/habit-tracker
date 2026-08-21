import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        reqired:true
    },
    name:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxLength:500
    }
},{timestamps:true});

const HabitSchema = mongoose.model("HabitSchema",habitSchema);

export default HabitSchema;