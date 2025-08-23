# student-analytics-portal
Student Attendance &amp; Analytics Portal — a simple, scalable web app to manage students, mark attendance ani view analytics. Backend: Django REST Framework + MySQL. Frontend: React.js.

✨ Features:
 ✅ User Authentication
    Teacher & Student login/signup
    Secure authentication using JWT
✅ Student Management
    Add, update, and manage student details
    Class-wise student records
✅ Attendance Management
    Mark daily attendance
    View attendance reports (per student / per class)
✅ Analytics Dashboard
    Attendance trends
    
Project structure :
  /backend   -> Django REST API (DRF + MySQL)
  /frontend  -> React.js (UI)

Installation and Setup:
  Backend(Django + MySQL):
    cd backend
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver

  Frontend(React.js): used(Vite)
    cd frontend
    npm install
    npm start dev
