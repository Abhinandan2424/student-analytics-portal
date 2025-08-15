from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Attendance
from .serializers import AttendanceSerializer

@api_view(["GET"])
@permission_classes([AllowAny])
def attendance_list(request):
    data = AttendanceSerializer(Attendance.objects.all(), many=True).data
    return Response(data)
