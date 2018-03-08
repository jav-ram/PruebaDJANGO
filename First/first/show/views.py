from django.http import HttpResponse


def index(request):
    return HttpResponse('<form action="/your-name/" method="post">{% csrf_token %}{{ form }}<input type="submit" value="Submit" /></form>')
