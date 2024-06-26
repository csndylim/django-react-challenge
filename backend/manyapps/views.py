from rest_framework.views import APIView
from rest_framework.response import Response
import re
import requests
from bs4 import BeautifulSoup

# Dictionary
# Weather
class DictionaryView(APIView):
    def post(self, request, *args, **kwargs):
        result = request.data.get("inputText", "")
        data = {"message": result}
        return Response(data)


# Weather
class WeatherView(APIView):
    def post(self, request, *args, **kwargs):
        city = request.data.get("inputText", "")
        response = requests.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=164fec96a27b97680ee442e489ce3f06')
        rawData = response.content
        cleanedData = eval(rawData.decode())
        try:
            result = {
                'City:': str(cleanedData['name']),
                "Country Code:": str(cleanedData['sys']['country']),
                "Coordinate:": str(cleanedData['coord']['lon']) + ' , '  
                                + str(cleanedData['coord']['lat']),  
                "Temperature:": str(round(((cleanedData['main']['temp'] -32) * 5/9),2)) + '°C',  
                "Pressure:": str(cleanedData['main']['pressure']),  
                "Humidity:": str(cleanedData['main']['humidity']),  
            }
        except:
            result = {"Error.": "Please try again."}

        data = {"message": result}
        return Response(data)

# Web Crawler
class WebCrawlerView(APIView):
    def post(self, request):
        url = request.data.get("inputText", "")

        if not url:
            return Response({'error': 'Please provide a valid URL'})

        try:
            response = requests.get(url)
            # response.raise_for_status():  # Raise an exception for non-200 status codes
            soup = BeautifulSoup(response.content, 'html.parser')
            links = []

            for link in soup.find_all('a'):
                href = link.get('href')
                if href and href.startswith('http'):
                    links.append(href)

            return Response({'message': links})

        except requests.exceptions.RequestException as e:
            return Response({'error': 'Error fetching data: ' + str(e)})

# URL Shortener
import random
from .models import urlShortener  # Import your urlShortener model

class URLShortenerView(APIView):

    def post(self, request, *args, **kwargs):
        longurl = request.data.get("inputText", "")
        s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!*^$-_"
        shorturl = ("".join(random.sample(s, 10)))
        urlShortener.objects.create(
            longurl=longurl,
            shorturl=shorturl
        )
        shorturl = "http://localhost:8000/" + shorturl
        return Response({"message": shorturl})

# File Upload
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .serializers import FileSerializer

class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)

        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Text to HTML
class TextToHTMLView(APIView):

    def formatHtml(self, text):
        # Remove Windows Linebreaks
        text = text.replace('\r\n', '\n')

        # Replace  H1
        text = re.sub('(\n/(?!/))(?P<id>.+)', '<h1>\g<id></h1>', text, 1)

        # Replace  H2
        text = re.sub('(\n//(?!/))(?P<id>.+)', '\n<h2>\g<id></h2>', text)

        # Replace  H3
        text = re.sub('(\n///(?!/))(?P<id>.+)', '\n<h3>\g<id></h3>', text)

        # Replace  H4
        text = re.sub('(\n////(?!/))(?P<id>.+)', '\n<h4>\g<id></h4>', text)

        # Replace IMG
        # img + link (external)
        text = re.sub(
            '(?P<prefix> |\n)img__http://(?P<fileName>.*?)(?P<fileExt>\.gif|\.jpg|\.jpeg|\.png)__(?P<fileAlt>.*?)__(?P<link>.*?)__',
            '\g<prefix><a href="\g<link>"><img src="http://\g<fileName>\g<fileExt>" alt="\g<fileAlt>" title="\g<fileAlt>" /></a>',
            text)
        # img + link (internal)
        text = re.sub(
            '(?P<prefix> |\n)img__(?P<fileName>.*?)(?P<fileExt>\.gif|\.jpg|\.jpeg|\.png)__(?P<fileAlt>.*?)__(?P<link>.*?)__',
            '\g<prefix><a href="\g<link>"><img src="static/images/\g<fileName>\g<fileExt>" alt="\g<fileAlt>" title="\g<fileAlt>" /></a>',
            text)
        # img only (external)
        text = re.sub(
            '(?P<prefix> |\n)img__http://(?P<fileName>.*?)(?P<fileExt>\.gif|\.jpg|\.jpeg|\.png)__(?P<fileAlt>.*?)__',
            '\g<prefix><img src="http://\g<fileName>\g<fileExt>" alt="\g<fileAlt>" title="\g<fileAlt>" />', text)
        # img only (internal)
        text = re.sub(
            '(?P<prefix> |\n)imgright__(?P<fileName>.*?)(?P<fileExt>\.gif|\.jpg|\.jpeg|\.png)__(?P<fileAlt>.*?)__',
            '\g<prefix><img src="static/images/\g<fileName>\g<fileExt>" alt="\g<fileAlt>" title="\g<fileAlt>" style="float:right" />',
            text)
        text = re.sub(
            '(?P<prefix> |\n)imgcenter__(?P<fileName>.*?)(?P<fileExt>\.gif|\.jpg|\.jpeg|\.png)__(?P<fileAlt>.*?)__',
            '\g<prefix><div class="row" style="text-align:center"><img src="static/images/\g<fileName>\g<fileExt>" alt="\g<fileAlt>" title="\g<fileAlt>" /></div>',
            text)
        text = re.sub('(?P<prefix> |\n)img__(?P<fileName>.*?)(?P<fileExt>\.gif|\.jpg|\.jpeg|\.png)__(?P<fileAlt>.*?)__',
                    '\g<prefix><img src="static/images/\g<fileName>\g<fileExt>" alt="\g<fileAlt>" title="\g<fileAlt>" />',
                    text)

        # Replace A
        # We add a space to all A near a special character or at the end of a line
        # We add a double space to A with already 1 space to preserve that space after linkFormat function
        text = re.sub('__(?P<link>(http://|/).*?)__ ', '__\g<link>__  ', text)
        text = re.sub('__(?P<link>(http://|/).*?)__(?P<anchor>\n|,|\.|;|\?|!|:|<)', '__\g<link>__ \g<anchor>', text)
        # All A followed by a space will be targeted
        text = re.sub('__(?P<id>(http://|/).*?)__ ', self.formatLink, text)

        # Replace  LI
        text = re.sub('(\n- (?P<id>.+))', '\n<li>\g<id></li>', text)

        # Replace TABLE
        text = re.sub('(!!)(?P<id>.*?)', '</td><td>', text)
        text = re.sub('\n\n</td><td>(?P<id>.*)',
                    '\n<table class="table table-bordered table-striped table-hover"><tr><td>\g<id>', text)
        text = re.sub('</td><td>\n</td><td>', '</td></tr>\n<tr><td>', text)
        text = re.sub('</td><td>\n\n', '</td></tr></table>\n\n', text)

        # Replace DOC
        text = re.sub('(?P<prefix> |\n)__(?P<fileName>.*?)__(?P<anchor>.*?)__',
                    '\g<prefix><a href="static/images/\g<fileName>">\g<anchor></a>', text)

        # Replace BR and P
        text = re.sub('\n(?!\n)(?!<h1|<h2|<h3|<li|<ul|<table|<tr|<td|</td)', '<br />', text)
        text = re.sub('\n<br />', '\n<p>', text)
        text = re.sub('\n<p>(?P<id>.*)', '\n<p>\g<id></p>', text)

        # Replace UL and LI
        text = re.sub('\n\n<li>(?P<id>.*)', '\n<ul><li>\g<id>', text)
        text = re.sub('</li>\n(?!<li>)', '</li></ul>\n', text)

        # Replace I
        text = re.sub('\*\*(?!\*)(?P<id>.*?)\*\*(?!\*)', '<i>\g<id></i>', text)

        # Replace B
        text = re.sub('\*(?!\*)(?P<id>.*?)\*(?!\*)', '<b>\g<id></b>', text)

        # Clean accidental empy tags
        text = re.sub('<p></p>', '', text)

        return text

    def formatLink(self, match):
        g = match.groups()[0].partition('__')
        # No custom anchor
        if g[1] == '':
            return '<a href="' + g[0] + '">' + g[0] + '</a>'
        # Custom anchor found
        else:
            return '<a href="' + g[0] + '">' + g[2] + '</a>'

    def post(self, request, *args, **kwargs):
        input_text = request.data.get("inputText", "")
        # Perform any processing on input_text
        formatted_text = self.formatHtml(('\n\n'+input_text+'\n\n'))
        print(formatted_text)
        data = {"message": f"You entered: {formatted_text}"}
        return Response(data)