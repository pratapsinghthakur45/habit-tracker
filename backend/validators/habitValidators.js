import { z } from "zod";

export const createHabitSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Habit name is required")
        .max(100, "Habit name cannot exceed 100 characters"),

    description: z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
});

export const updateHabitSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Habit name cannot be empty")
        .max(100, "Habit name cannot exceed 100 characters")
        .optional(),

    description: z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
});