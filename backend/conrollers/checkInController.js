import CheckIn from "../models/checkInHabits.js";
import HabitSchema from "../models/habitModels.js";
import User from "../models/userModel.js";
import { DateTime } from "luxon";
import { calculateStreaks } from "../src/streakService.js";

export const checkIn = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const habitId = req.params.id;

        if (!habitId) {
            return res.status(400).json({
                message: "Habit ID is required"
            });
        }

        // Get user from database
        const userData = await User.findById(user.id);

        if (!userData) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const timezone = userData.timezone;

        // Get user's current local date
        const userLocalToday = DateTime.now()
            .setZone(timezone)
            .toISODate();



        const { date } = req.body;

        if (!date) {
            return res.status(400).json({
                message: "Date is required"
            });
        }

        // Future date check
        if (date > userLocalToday) {
            return res.status(400).json({
                message: "You cannot check in for a future date"
            });
        }



        // Check whether habit exists and belongs to user
        const habit = await HabitSchema.findOne({
            _id: habitId,
            user: user.id
        });

        if (!habit) {
            return res.status(404).json({
                message: "Habit not found"
            });
        }

        const habitCreatedLocalDate = DateTime
            .fromJSDate(habit.createdAt)
            .setZone(timezone)
            .toISODate();

        //date before the habit created
        if (date < habitCreatedLocalDate) {
            return res.status(400).json({
                message: "You cannot check in before the habit was created"
            });
        }
        // Check duplicate
        const existingCheckIn = await CheckIn.findOne({
            habit: habitId,
            localDate: date
        });

        if (existingCheckIn) {
            return res.status(409).json({
                message: "Habit is already checked in for this date"
            });
        }

        // Create check-in
        const newCheckIn = new CheckIn({
            user: user.id,
            habit: habitId,
            localDate: date
        });

        const savedCheckIn = await newCheckIn.save();

        return res.status(201).json({
            message: "Check-in created successfully",
            checkIn: savedCheckIn
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getCheckIn = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(403).json({ message: "Unauthorized:" });
        }

        const habitId = req.params.id;

        const checkIns = await CheckIn.find({ habit: habitId, user: user.id });

        if (!checkIns) {
            return res.status(404).json({ message: "Not check in yet:" });
        }
        const userData = await User.findById(user.id);

        const today = DateTime
            .now()
            .setZone(userData.timezone)
            .toISODate();

        const { currentStreak, longestStreak } =
            calculateStreaks(checkIns, today);

        return res.status(200).json({ message: "All check in fetched:", checkIns,currentStreak,longestStreak });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error:" });
    }
}

export const deleteCheckIn = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        const { habitId, checkInId } = req.params;

        console.log("Habit ID:", habitId);
        console.log("Check-in ID:", checkInId);
        console.log("User ID:", user.id);

        // First find the check-in by its ID
        const checkIn = await CheckIn.findById(checkInId);

        console.log("Check-in found:", checkIn);

        if (!checkIn) {
            return res.status(404).json({
                message: "Check-in not found"
            });
        }

        // Make sure this check-in belongs to this habit
        if (checkIn.habit.toString() !== habitId) {
            return res.status(403).json({
                message: "Check-in does not belong to this habit"
            });
        }

        // Make sure this check-in belongs to this user
        if (checkIn.user.toString() !== user.id.toString()) {
            return res.status(403).json({
                message: "You cannot delete this check-in"
            });
        }

        // Delete check-in
        await CheckIn.findByIdAndDelete(checkInId);

        return res.status(200).json({
            message: "Check-in deleted successfully",
            checkIn
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};