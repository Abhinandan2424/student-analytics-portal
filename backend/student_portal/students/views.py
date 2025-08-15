# students/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer, AttendanceSerializer, MarksSerializer
from attendance.models import Attendance
from marks.models import Marks
from django.db.models import Avg, Count

@api_view(["GET"])
@permission_classes([AllowAny])
def student_list(request):
    qs = Student.objects.all().order_by("student_class","roll_no")
    return Response(StudentSerializer(qs, many=True).data)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def add_student(request):
    if request.method == 'GET':
        return Response({"message": "Use POST to add a student"})

    qs = StudentSerializer(data=request.data)
    if qs.is_valid():
        qs.save()
        return Response(qs.data)
    return Response(qs.errors, status=400)


# Attendance list (optionally filter by date/class)
@api_view(["GET"])
@permission_classes([AllowAny])
def attendance_list(request):
    date = request.query_params.get("date")
    cls = request.query_params.get("class")
    qs = Attendance.objects.select_related("student").all().order_by("-date")
    if date:
        qs = qs.filter(date=date)
    if cls:
        qs = qs.filter(student__student_class=cls)
    return Response(AttendanceSerializer(qs, many=True).data)

# Marks list (filter by class/subject/student)
@api_view(["GET"])
@permission_classes([AllowAny])
def marks_list(request):
    cls = request.query_params.get("class")
    subject = request.query_params.get("subject")
    student_id = request.query_params.get("student_id")
    qs = Marks.objects.select_related("student").all().order_by("exam_date")
    if cls:
        qs = qs.filter(student__student_class=cls)
    if subject:
        qs = qs.filter(subject=subject)
    if student_id:
        qs = qs.filter(student_id=student_id)
    return Response(MarksSerializer(qs, many=True).data)

# Dashboard summary endpoint
@api_view(["GET"])
@permission_classes([AllowAny])
def dashboard_summary(request):
    total_students = Student.objects.count()
    # average attendance across all students: compute overall present / total
    total_attendance_records = Attendance.objects.count()
    total_present = Attendance.objects.filter(status="present").count()
    avg_attendance_pct = round((total_present / total_attendance_records * 100), 2) if total_attendance_records else 0

    # average marks across all marks
    avg_marks = Marks.objects.aggregate(avg=Avg('marks_obtained'))['avg'] or 0
    return Response({
        "total_students": total_students,
        "avg_attendance_pct": avg_attendance_pct,
        "avg_marks": round(avg_marks, 2)
    })

# Student summary (attendance% + subject averages)
@api_view(["GET"])
@permission_classes([AllowAny])
def student_summary(request, student_id):
    att_total = Attendance.objects.filter(student_id=student_id).count()
    att_present = Attendance.objects.filter(student_id=student_id, status="present").count()
    attendance_pct = round((att_present / att_total * 100), 2) if att_total else 0
    subj_avg = Marks.objects.filter(student_id=student_id).values("subject").annotate(avg=Avg("marks_obtained"))
    return Response({
        "student_id": student_id,
        "attendance_percent": attendance_pct,
        "subject_averages": list(subj_avg)
    })
