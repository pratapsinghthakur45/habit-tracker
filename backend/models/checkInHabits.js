import mongoose from "mongoose";

const checkInSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        habit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Habit",
            required: true
        },

        localDate: {
            type: String,
            required: true,
            match: /^\d{4}-\d{2}-\d{2}$/
        }
    },
    {
        timestamps: true
    }
);

// Prevent duplicate check-ins for the same habit on the same local day
checkInSchema.index(
    { habit: 1, localDate: 1 },
    { unique: true }
);

const CheckIn = mongoose.model("CheckIn", checkInSchema);

export default CheckIn;