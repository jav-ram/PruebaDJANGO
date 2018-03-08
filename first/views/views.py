from django.shortcuts import render
from django.http import HttpResponse

import psycopg2
import sys
import pprint

conn_string = "host='localhost' dbname='myproject' user='postgres' password='j66352769'"
	# print the connection string we will use to connect
	#print "Connecting to database\n	->%s" % (conn_string)
 
	# get a connection, if a connect cannot be made an exception will be raised here
conn = psycopg2.connect(conn_string)
 
	# conn.cursor will return a cursor object, you can use this cursor to perform queries
cursor = conn.cursor()
 
	# execute our Query
cursor.execute("SELECT COUNT(*) FROM COMPANY")
 
	# retrieve the records from the database
records = cursor.fetchall()
 
	# print out the records using pretty print
	# note that the NAMES of the columns are not shown, instead just indexes.
	# for most people this isn't very useful so we'll show you how to return
	# columns as a dictionary (hash) in the next example.
pprint.pprint(records)

s = "Hello, world. You're at the polls index." + str(records[0][0])

from django.shortcuts import render
from django.http import HttpResponseRedirect

from .forms import NameForm

def get_name(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = NameForm(request.POST)
        # check whether it's valid:
    # if a GET (or any other method) we'll create a blank form
    else:
        form = NameForm()

    return render(request, 'request.html', {'form': form})

# Create your views here.


		