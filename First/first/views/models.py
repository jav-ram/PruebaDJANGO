from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=149)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete = models.CASCADE)
    choice_text = models.CharField(max_length = 149)
    votes = models.IntegerField(default = 0)



		