# Habit Tracker with Streaks

A full-stack Habit Tracker application built as a take-home assignment for the Product Engineering Intern — Full Stack position.

The application allows users to create habits, check in for the current day, backfill missed dates, view their check-in history, and track current and longest streaks based on their local timezone.

---

## 🚀 Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Secure password hashing using bcrypt
- User-specific data protection
- IANA timezone assignment during registration

### Habit Management

- Create a habit
- View all habits
- View individual habit details
- Edit habits
- Delete habits

### Check-ins

- Check in for the current local day
- Backfill missed dates
- Prevent duplicate check-ins
- Prevent future-date check-ins
- Prevent check-ins before the habit was created

### Streak Tracking

- Current streak calculation
- Longest streak calculation
- Streak recalculation after check-in deletion
- Streaks calculated using local calendar dates rather than elapsed hours

### History

- View the last 30 days of habit activity
- Clearly distinguish completed and missed days
- Remove completed check-ins from history

### Validation & Error Handling

- Authentication validation
- Duplicate check-in validation
- Future-date validation
- Habit creation-date validation
- User ownership validation
- Meaningful API error responses

---

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- Axios
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Luxon

---

## 📁 Project Structure

```text
habit-tracker/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── .env.example
├── .gitignore
└── README.md
