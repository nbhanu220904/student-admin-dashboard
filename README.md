# Student Admin Dashboard

A full-stack **Student Administration Dashboard** with separate **Student** and **Admin** panels, enabling profile management, update requests, and secure role-based authentication.

## Live Demo
[Student Admin Dashboard](https://student-admin-dashboard-nu.vercel.app/login)

## Features

### Student Dashboard
- View personal profile details.
- Request updates to profile information.
- Request password changes.
- View status of submitted requests.

### Admin Dashboard
- View all registered users.
- Approve or reject student requests for profile or password updates.
- Real-time updates reflected in student dashboards.

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT Token Authentication
- **Other:** Axios for API calls, CSS for styling

## Installation

1. Clone the repository:

```bash
git clone https://github.com/nbhanu220904/student-admin-dashboard.git
Navigate to the project directory:

bash
Copy code
cd student-admin-dashboard
Install dependencies for both frontend and backend:

bash
Copy code
npm install
Set up environment variables (.env):

env
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
Start the backend server:

bash
Copy code
npm run server
Start the frontend:

bash
Copy code
npm start
Open http://localhost:3000 in your browser.

Project Structure
bash
Copy code
student-admin-dashboard/
├─ backend/          # Node.js + Express backend
├─ frontend/         # React.js frontend
├─ README.md
└─ package.json
Usage
Students can log in, update their details, and request password changes.

Admins can log in, view users, approve/reject requests, and manage dashboard data.

Future Enhancements
Add email notifications for request status updates.

Implement role-based dashboard analytics.

Improve UI/UX with Material-UI or Tailwind CSS.

License
This project is licensed under the MIT License.

vbnet
Copy code

If you want, I can also **enhance it with screenshots, GIF demo, and badges** to make it more **visually appealing and professional** for GitHub. Do you want me to do that next?






