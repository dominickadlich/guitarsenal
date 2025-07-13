from rest_framework import serializers
from .models import Guitar_Model, Current_Setup, Guitar_Pictures


class GuitarModelSerializer(serializers.ModelSerializer):
    setup_history = serializers.SerializerMethodField()
    photos = serializers.SerializerMethodField()

    def get_setup_history(self, obj):
        setups = obj.current_setup_set.order_by('-string_change_date')
        return CurrentSetupSerializer(setups, many=True).data
    
    def get_photos(self, obj):
        photos = obj.guitar_pictures_set.all()
        return GuitarPicturesSerializer(photos, many=True).data

    class Meta:
        model = Guitar_Model
        fields = '__all__'


class GuitarBasicSerializer(serializers.ModelSerializer):
    primary_photo = serializers.SerializerMethodField()

    def get_primary_photo(self, obj):
        primary = obj.guitar_pictures_set.filter(is_primary=True).first()
        return primary.image.url if primary else None

    class Meta:
        model = Guitar_Model
        fields = ['id', 'brand', 'model', 'primary_photo']

class CurrentSetupSerializer(serializers.ModelSerializer):
    guitar = GuitarBasicSerializer(read_only=True)

    class Meta:
        model = Current_Setup
        fields = '__all__'


class GuitarPicturesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guitar_Pictures
        fields = '__all__'
        read_only_fields = ['guitar']