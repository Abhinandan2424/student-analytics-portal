from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    student_class = models.CharField(max_length=20)   
    roll_no = models.PositiveIntegerField()
    contact = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    class Meta:
        unique_together = ('student_class','roll_no')

    def __str__(self):
        return f"{self.student_class}-{self.roll_no} {self.name}"
