# Student Admin Dashboard - Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the server directory with the following variables:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/student-admin-dashboard
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
```

4. Start the server:

```bash
npm start
```

The server will run on `http://localhost:4000`

## Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The client will run on `http://localhost:5173`

## Features Implemented

### Authentication

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control (Admin/Student)
- ✅ Protected routes

### Admin Features

- ✅ View all students
- ✅ Add new students
- ✅ Edit student information
- ✅ Delete students
- ✅ Admin dashboard with full CRUD operations

### Student Features

- ✅ View own profile
- ✅ Update profile information (name, email, course)
- ✅ Student dashboard
- ✅ Protected student routes

### User Roles

- **Admin**: Can manage all student records
- **Student**: Can only view and update their own profile

## API Endpoints

### Authentication

- `POST /auth/student/register` - Register new student
- `POST /auth/admin/register` - Register new admin
- `POST /auth/student/login` - Student login
- `POST /auth/admin/login` - Admin login
- `GET /auth/me` - Get current user profile
- `PUT /auth/student/update` - Update student profile

### Student Management (Admin only)

- `GET /students` - Get all students
- `GET /students/:id` - Get student by ID
- `POST /students` - Create new student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student

### Student Dashboard

- `GET /students/dashboard` - Get student dashboard data

## Database Models

### Student Model

- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- course (String, default: 'MERN Bootcamp')
- enrollmentDate (Date, default: current date)

### User Model (for Admins)

- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- role (String, enum: ['admin', 'student'], default: 'student')

## Testing the Application

1. Start both server and client
2. Navigate to `http://localhost:5173`
3. Register as an admin or student
4. Test the different features based on your role

### Test Accounts

You can create test accounts through the registration forms:

- Admin: Register with admin role
- Student: Register with student role

## Project Structure

```
student-admin-dashboard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts (Auth)
│   │   ├── pages/          # Page components
│   │   └── ...
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Custom middlewares
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── server.js          # Main server file
└── SETUP.md               # This file
```

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Role-based access control
- Protected routes on both frontend and backend
- Input validation and error handling

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- **Frontend**: React, React Router, Tailwind CSS, Context API
- **Database**: MongoDB
