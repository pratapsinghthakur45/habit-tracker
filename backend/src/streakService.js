import { DateTime } from "luxon";

export const calculateStreaks = (checkIns, today) => {
    // Convert check-ins into a Set for fast lookup
    const checkInDates = new Set(
        checkIns.map((checkIn) => checkIn.localDate)
    );

    // -------------------------
    // Current Streak
    // -------------------------

    let currentStreak = 0;

    let currentDate = DateTime.fromISO(today);

    // If today is not checked in,
    // start checking from yesterday.
    if (!checkInDates.has(currentDate.toISODate())) {
        currentDate = currentDate.minus({ days: 1 });
    }

    while (checkInDates.has(currentDate.toISODate())) {
        currentStreak++;

        currentDate = currentDate.minus({ days: 1 });
    }

    // -------------------------
    // Longest Streak
    // -------------------------

    let longestStreak = 0;
    let runningStreak = 0;

    // Sort dates from oldest → newest
    const sortedDates = [...checkInDates].sort();

    let previousDate = null;

    for (const date of sortedDates) {
        const current = DateTime.fromISO(date);

        if (previousDate === null) {
            runningStreak = 1;
        } else {
            const difference = current
                .diff(previousDate, "days")
                .days;

            if (difference === 1) {
                runningStreak++;
            } else {
                runningStreak = 1;
            }
        }

        longestStreak = Math.max(
            longestStreak,
            runningStreak
        );

        previousDate = current;
    }

    return {
        currentStreak,
        longestStreak
    };
};