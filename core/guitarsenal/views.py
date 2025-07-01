from .models import Current_Setup, Guitar_Model, Guitar_Pictures
from .serializers import GuitarBasicSerializer, CurrentSetupSerializer, GuitarModelSerializer, GuitarPicturesSerializer
from rest_framework import generics

class GuitarList(generics.ListCreateAPIView):
    queryset = Guitar_Model.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return GuitarModelSerializer
        return GuitarBasicSerializer


class GuitarDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Guitar_Model.objects.all()
    serializer_class = GuitarModelSerializer


class GuitarSetup(generics.ListCreateAPIView):
    serializer_class = CurrentSetupSerializer

    def get_queryset(self):
        guitar_pk = self.kwargs['pk']
        return Current_Setup.objects.filter(guitar_id=guitar_pk)
    
    def perform_create(self, serializer):
        guitar_pk = self.kwargs['pk']
        guitar = Guitar_Model.objects.get(pk=guitar_pk)
        serializer.save(guitar=guitar)


class GuitarPictures(generics.ListCreateAPIView):
    serializer_class = GuitarPicturesSerializer

    def get_queryset(self):
        guitar_pk = self.kwargs['pk']
        return Guitar_Pictures.objects.filter(guitar_id=guitar_pk)
    
    def perform_create(self, serializer):
        guitar_pk = self.kwargs['pk']
        guitar = Guitar_Model.objects.get(pk=guitar_pk)
        serializer.save(guitar=guitar)