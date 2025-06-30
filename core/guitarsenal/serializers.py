from rest_framework import serializers
from .models import Guitar_Model, Current_Setup, Guitar_Pictures


class GuitarModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guitar_Model
        fields = '__all__'


class GuitarBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guitar_Model
        fields = ['brand', 'model']


class CurrentSetupSerializer(serializers.ModelSerializer):
    guitar = GuitarBasicSerializer(read_only=True)

    class Meta:
        model = Current_Setup
        fields = ['tuning', 'string_gauge', 'string_brand', 'string_change_date']


class GuitarPicturesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guitar_Pictures
        fields = '__all__'