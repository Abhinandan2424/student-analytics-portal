from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Marks
from .serializers import MarksSerializer

@api_view(["GET"])
@permission_classes([AllowAny])
def marks_list(request):
    data = MarksSerializer(Marks.objects.all(), many=True).data
    return Response(data)


