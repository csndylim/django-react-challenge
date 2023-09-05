# manually create this file
from django.urls import path
from .views import TextToHTMLView, FileUploadView, URLShortenerView, WebCrawlerView, WeatherView, DictionaryView

app_name = 'manyapps'

urlpatterns = [
    path('texttohtml_django/', TextToHTMLView.as_view()),
    path('fileupload_django/', FileUploadView.as_view()),
    path('urlshortener_django/', URLShortenerView.as_view()),
    path('webcrawler_django/', WebCrawlerView.as_view()),
    path('weather_django/', WeatherView.as_view()),
    path('dictionary_django/', DictionaryView.as_view()),

]

