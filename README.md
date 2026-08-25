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


🌍 Timezone & Local-Day Logic
Timezone handling is one of the most important parts of this application.

Each user is assigned an IANA timezone, for example:

Asia/Kolkata
America/New_York
Europe/London

The backend uses the user's timezone to determine their current local date.

For example, if the user's timezone is:

Asia/Kolkata

the application determines today's date according to that timezone rather than relying on the server's timezone.

Check-ins are stored using a local calendar date:

2026-08-25

instead of relying on elapsed hours or timestamps.

This ensures that streaks are calculated based on consecutive local calendar days.

Example

If a user checks in on:

2026-08-23
2026-08-24
2026-08-25

the streak is:

3 days

The calculation does not depend on whether exactly 24 hours have passed between check-ins.

Luxon is used on the backend for timezone-aware date calculations.

🔥 Streak Logic

The application calculates two types of streaks.

Current Streak

The number of consecutive completed local days ending on the user's current local day.

For example:

Today       ✓
Yesterday   ✓
2 days ago  ✓
3 days ago  ✗

Current streak:

3 days
Longest Streak

The longest sequence of consecutive completed local dates across the habit's entire history.

Example:

Day 1  ✓
Day 2  ✓
Day 3  ✓
Day 4  ✗
Day 5  ✓
Day 6  ✓

Longest streak:

3 days.

📅 Backfilling

Users can check in for missed dates from the past.

However, the backend validates the requested date.

A check-in is only allowed when:

Habit creation date <= selected date <= user's current local date

Therefore:

Dates before habit creation are rejected.
Future dates are rejected.
Duplicate check-ins are rejected.

This validation is handled by the backend so that the business rules cannot be bypassed from the frontend.

🔐 Authentication

The application uses JWT authentication.

After successful registration or login, the backend returns a JWT token.

The frontend stores the token and sends it with authenticated API requests.

Protected routes use JWT middleware to verify the authenticated user.

Passwords are never stored as plain text. Passwords are hashed using bcrypt before being stored in MongoDB.

🗄️ Database

MongoDB is used as the application's database with Mongoose for schema definition and validation.

Main data models include:

User
Habit
CheckIn

Check-ins are associated with both the user and the corresponding habit.

This allows the backend to verify ownership before allowing users to modify or delete data.

Since this application uses MongoDB rather than a relational database, SQL migration files are not applicable.

🔌 API Overview
Authentication
POST /user/register
POST /user/login
Habits
POST   /user/habit
GET    /user/habits
GET    /user/habits/:id
PUT    /user/habits/:id
DELETE /user/habits/:id
Check-ins
POST   /user/habits/:id/checkIn
GET    /user/habits/:id/checkIn
DELETE /user/habits/:habitId/checkIn/:checkInId


🏃 Running the Project Locally
1. Clone the repository
git clone YOUR_GITHUB_REPOSITORY_URL
cd habit-tracker
2. Start the Backend
cd backend

Install dependencies:

npm install

Create your .env file:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the development server:

npm run dev

The backend will run on:

http://localhost:3000

3. Start the Frontend

Open another terminal:

cd frontend
cd Habit_tracker

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend will be available at the URL provided by Vite, usually:

http://localhost:5173
🧪 Important Validation Cases

The application handles the following edge cases:

Duplicate check-in

A user cannot check in twice for the same habit and local date.

Future date

A user cannot create a check-in for a future local date.

Before habit creation

A user cannot create a check-in for a date before the habit existed.

Unauthorized access

Users cannot access or modify another user's habits or check-ins.

Check-in deletion

Deleting a check-in triggers streak recalculation.

🎯 Design Decisions
Local date instead of elapsed time

The application treats a day as a calendar day in the user's assigned timezone.

This avoids incorrect streak calculations caused by UTC/server timezone differences.

Backend validation

Important business rules are enforced on the backend rather than relying only on frontend validation.

User ownership

Habit and check-in operations verify that the authenticated user owns the corresponding resource.

Simple architecture

The project intentionally avoids unnecessary complexity and focuses on the core requirements of the assignment.

📌 Future Improvements

The current implementation focuses on the requirements of the take-home assignment.

Possible future improvements include:

More timezone options
Better loading states
More detailed analytics
Habit categories
Habit reminders
Improved mobile UI
Automated backend tests


👨‍💻 Author
Pratap Singh Thakur
Repository: https://github.com/pratapsinghthakur45/habit-tracker
git clone https://github.com/pratapsinghthakur45/habit-tracker.githttps://github.com/pratapsinghthakur45/habit-tracker


Built as part of the Product Engineering Intern — Full Stack take-home assignment.

📄 Assignment

Position: Product Engineering Intern — Full Stack

Assignment: Habit Tracker with Streaks

Company: Burdenoff Consultancy Services Pvt. Ltd.
