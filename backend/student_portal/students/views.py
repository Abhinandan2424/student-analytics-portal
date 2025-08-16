
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer, AttendanceSerializer, MarksSerializer
from attendance.models import Attendance
from marks.models import Marks



# student list 
@api_view(["GET"])
@permission_classes([AllowAny])
def student_list(request):
    qs = Student.objects.all().order_by("student_class","roll_no")
    return Response(StudentSerializer(qs, many=True).data)

#student creation 
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


# Attendance list 
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

# Marks list
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

