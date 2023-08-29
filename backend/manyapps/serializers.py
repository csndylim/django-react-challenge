from rest_framework.serializers import ModelSerializer
from .models import File, urlShortener

class FileSerializer(ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'

class urlShortenerSerializer(ModelSerializer):
    class Meta:
        model = urlShortener
        fields = '__all__'



