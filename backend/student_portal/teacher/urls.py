from django.urls import path
from .views import signup_teacher, login_teacher

urlpatterns = [
    path('signup/', signup_teacher, name="signup_teacher"),
    path('login/', login_teacher, name="login_teacher"),
]
