# students/serializers.py
from rest_framework import serializers
from .models import Student
from attendance.models import Attendance
from marks.models import Marks

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"

class AttendanceSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)

    class Meta:
        model = Attendance
        fields = ["id", "student", "date", "status"]
        

class MarksSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.name', read_only=True)
    student_class = serializers.CharField(source='student.student_class', read_only=True)

    class Meta:
        model = Marks
        fields = ["id","student","student_name","student_class","subject","marks_obtained","max_marks","exam_type","exam_date"]
