# manually create this file
from django.urls import path
from .views import TextToHTMLView, FileUploadView, URLShortenerView

app_name = 'manyapps'

urlpatterns = [
    path('texttohtml_django/', TextToHTMLView.as_view()),
    path('fileupload_django/', FileUploadView.as_view()),
    path('urlshortener_django/', URLShortenerView.as_view()),

]

