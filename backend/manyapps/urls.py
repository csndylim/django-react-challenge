# manually create this file
from django.urls import path
from .views import TextToHTMLView, FileUploadView, URLShortenerView, WebCrawlerView

app_name = 'manyapps'

urlpatterns = [
    path('texttohtml_django/', TextToHTMLView.as_view()),
    path('fileupload_django/', FileUploadView.as_view()),
    path('urlshortener_django/', URLShortenerView.as_view()),
    path('webcrawler_django/', WebCrawlerView.as_view()),

]

