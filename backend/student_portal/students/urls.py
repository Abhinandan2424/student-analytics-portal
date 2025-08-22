# students/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, attendance_list, save_attendance, marks_list, attendance_today

router = DefaultRouter()
router.register(r"students", StudentViewSet, basename="student")

urlpatterns = [
    path("", include(router.urls)),                 # /api/students/ ...
    path("attendance/", attendance_list, name="attendance_list"),
    path("attendance/today/", attendance_today, name="attendance_today"), 
    path("save-attendance/", save_attendance, name="save_attendance"),
    path("marks/", marks_list, name="marks_list"),
]
