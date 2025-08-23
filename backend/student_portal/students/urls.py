from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, attendance_list, save_attendance, attendance_today

router = DefaultRouter()
router.register(r"students", StudentViewSet, basename="student")

urlpatterns = [
    path("", include(router.urls)),               
    path("attendance/", attendance_list, name="attendance_list"),
    path("attendance/today/", attendance_today, name="attendance_today"), 
    path("save-attendance/", save_attendance, name="save_attendance"),
   
]
