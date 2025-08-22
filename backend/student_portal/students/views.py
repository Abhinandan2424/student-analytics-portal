from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Q
from django.shortcuts import get_object_or_404
from .models import Student
from .serializers import StudentSerializer, AttendanceSerializer, MarksSerializer
from attendance.models import Attendance
from marks.models import Marks
from .models import Student
from .serializers import StudentSerializer
from django.utils.timezone import now


class StudentViewSet(viewsets.ModelViewSet):
 
    queryset = Student.objects.all().order_by("student_class", "roll_no")
    serializer_class = StudentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()
        cls = self.request.query_params.get("student_class")
        search = self.request.query_params.get("search")
        if cls:
            qs = qs.filter(student_class=cls)
        if search:
            qs = qs.filter(Q(name__icontains=search) | Q(roll_no__icontains=search))
        return qs

   
    def create(self, request, *args, **kwargs):
        many = isinstance(request.data, list)
        serializer = self.get_serializer(data=request.data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



# Attendance List
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


# save attendance
@api_view(["POST"])
@permission_classes([AllowAny])
def save_attendance(request):
    data = request.data  # list of objects from React
    saved_records = []

    for entry in data:
        student_id = entry.get("student_id")
        date = entry.get("date")
        status = entry.get("status")

        obj, created = Attendance.objects.update_or_create(
            student_id=student_id,
            date=date,
            defaults={"status": status}
        )
        saved_records.append(obj)

    return Response(AttendanceSerializer(saved_records, many=True).data)


# Todays Attendance
@api_view(["GET"])
@permission_classes([AllowAny])
def attendance_today(request):
    today = now().date()
    qs = Attendance.objects.filter(date=today)

    total_students = qs.count()
    present_students = qs.filter(status="Present").count()
    absent_students = qs.filter(status="Absent").count()

    percentage = (present_students / total_students * 100) if total_students > 0 else 0

    return Response({
        "date": today,
        "total_students": total_students,
        "present": present_students,
        "absent": absent_students,
        "percentage": round(percentage, 2)
    })

#mark list
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
