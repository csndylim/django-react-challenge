from django.shortcuts import redirect
from django.views import View
from manyapps.models import urlShortener  # Import your urlShortener model

class RedirectUrlView(View):
    def get(self, request, shorturl):
        try:
            obj = urlShortener.objects.get(shorturl=shorturl)
        except urlShortener.DoesNotExist:
            obj = None

        if obj is not None:
            return redirect(obj.longurl)
