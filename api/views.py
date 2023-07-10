
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from api import serializers
from .models import Note
from .serializers import NoteSerializer
from .utils import updateNote, getNoteDetail, deleteNote, getNotesList, createNote
# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes =[
        {
            'Endpoint': '/notes/',
            'method':'GET',
            'body':None ,
            'description': 'return an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'return a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body':""},
            'description': 'create new note with data sent in post request'
        },

        {
            'Endpoint': '/notes/id/update',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'create an existing note with data sent in post request'
        },

        {
            'Endpoint':'note/id/delete/',
            'method':'DELETE',
            'body': None,
            'description':'Delete and exiting note '
        },
    ]
    return Response(routes)


@api_view(['GET','POST'])
def getNotes(request):

    if request.method == 'GET':
        return getNotesList(request)

    if request.method == 'POST':
        return createNote(request)

    # notes= Note.objects.all().order_by('-updated') # order_by() to sort the data asendingly ,so
    # serializer = NoteSerializer(notes, many=True ) #here  we uses it to order the notes and put the
    # return Response(serializer.data)               # the updated note at the top of the list


@api_view(['GET','PUT', 'DELETE'])
def getNote(request,pk):
    if request.method == 'GET':
        return getNoteDetail(request, pk)

    if request.method == 'PUT':
        return updateNote(request, pk)

    if request.method == 'DELETE':
        return deleteNote(request, pk)

    # note = Note.objects.get(id=pk)
    # serializer = NoteSerializer(note, many=False)
    # return Response(serializer.data)


# @api_view(['PUT'])
# def updateNote(request, pk):
#     data = request.data
#     note = Note.objects.get(id=pk)
#     serializer = NoteSerializer(instance= note , data=data)

#     if serializer.is_valid():
#         serializer.save()

#     return Response(serializer.data)


# @api_view(['DELETE'])
# def deleteNote(request , pk):
#     note =Note.objects.get(id=pk)
#     note.delete()

#     return Response('Note has been deleted!!')



# @api_view(['POST'])
# def createNote(request):
#     data = request.data
#     note = Note.objects.create(
#         body=data['body']
#     )
#     serializer = NoteSerializer(note, many=False)
#     return Response(serializer.data)