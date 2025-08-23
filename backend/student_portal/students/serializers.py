# students/serializers.py
from rest_framework import serializers
from .models import Student
from attendance.models import Attendance

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"

class AttendanceSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)

    class Meta:
        model = Attendance
        fields = ["id", "student", "date", "status"]
        
