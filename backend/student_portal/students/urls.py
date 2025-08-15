from django.urls import path
from . import views

urlpatterns = [
    path('students/add_student/', views.add_student, name='add_student'),
    path('students/', views.student_list),
    path('attendance/', views.attendance_list),
    path('marks/', views.marks_list),
    path('dashboard/', views.dashboard_summary),
    path('student-summary/<int:student_id>/', views.student_summary),
]
