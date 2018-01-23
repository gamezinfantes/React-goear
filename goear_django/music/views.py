from .models import Track
from bs4 import BeautifulSoup
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.views.generic import TemplateView, View
import json
import re
import requests

# Create your views here.


googleUrl = "https://clients1.google.com/complete/search?callback=jQuery1102006778037338517606_1443603764944&nolabels=t&client=youtube&ds=yt&_=1443603764945&q=c"
url = "https://clients1.google.com/complete/search?"
data = "q=" + 'metalli' + "&nolabels=t&client=youtube&ds=yt"

goearUrl = "http://www.goear.com/action/suggest/sounds"
goearSearch = "http://www.goear.com/search/"

def get_soup_from_url(url):
    r = requests.get(url)
    if r.status_code == 200:
        return r.content
    else:
        error = "Error al obtener la url %s - Status code %d" % (url, r.status_code)
        print error
        return False


def search(request):
    print 'goo'
    response = get_soup_from_url(url+data)
    response = response.split('(')[1][:-1]

    # Goear search
    headers ={

    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'Accept': '*/*',
    'Origin': 'http://www.goear.com',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Referer': 'http://www.goear.com/radio',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'es-ES,es;q=0.8,en;q=0.6',

    }
    rs = eval(response)
    rs[1]
    # = ["metalli",[["metallica",0],["metallica nothing else matters",0],["metallica one",0],["metallica enter sandman",0],["metallica master of puppets",0],["metallica fade to black",0],["metallica for whom the bell tolls",0],["metallica unforgiven",0],["metallica sad but true",0],["metallica live",0]],{"k":1,"q":"AtF0EJR8VVDVQXguvOD3zGTunEQ"}];


    print 'Goear'
    '''rg = requests.post(goearUrl, data=enco)
    print rg.text
    print rg.content'''


    return HttpResponse(rs)

# ajax({type: "POST", url: "http://www.goear.com/"+"action/suggest/soundsadd2pl", data:{ data: data, skey: 'metalli' }, dataType: 'jsonp'});





class Home(TemplateView):
    template_name = "base.html"


class Search(View):
    def get_search_url(self, q):
        return "http://www.goear.com/search/%s?viewmode=iframe" % (q)

    def get(self, request, *args, **kwargs):
        r = requests.get(self.get_search_url(self.kwargs.get('q')))
        soup = BeautifulSoup(r.content, 'html.parser')
        songs = soup.select('ol.board_list.results_list > li.board_item.sound_item.group')
        ss = [{
                'title': song.select('.title')[0].text,
                'artist': song.select('.band')[0].text,
                'duration': Track.displayDuration_to_sec(song.select('.length')[0].text),
                'bitrate': song.select('.kbps')[0].text,
                'id': song.select('.band_img img')[0].get('soundid'),
                'file': "http://www.goear.com/action/sound/get/%s" % song.select('.band_img img')[0].get('soundid'),
                'cover': song.select('.band_img img')[0].get('src'),
            } for song in songs]
        return HttpResponse(json.dumps(ss), content_type="application/json")


class Category(View):
    valid_categories = [
        "blues", "classical", "contemporary", "country", "electronic", "gospel", "humor", "indie", "jazz", "latin",
        "metal", "pop", "punk", "rythm", "hiphop", "reggae", "reggaeton", "rock", "ska"
    ]

    def get_url(self, category):
        return "http://www.goear.com/categories/%s?viewmode=iframe" % category

    def get(self, request, *args, **kwargs):
        if self.kwargs.get('category') in self.valid_categories:
            r = requests.get(self.get_url(self.kwargs.get('category')))
            soup = BeautifulSoup(r.content, 'html.parser')
            songs = soup.select('.categories + script')[0].text
            j = re.findall(r'JSON.parse\(\'(.+)\'\);', songs)[0]
            jr = j.replace("\\", "")
            songs = json.loads(jr)
            json_response = [{
                'title': song.get('title'),
                'artist': song.get('artist'),
                'duration': song.get('duration'),
                'bitrate': song.get('bitrate'),
                'id': song.get('soundid'),
                'file': "http://www.goear.com/action/sound/get/%s" % song.get('soundid'),
                'cover': "http://www.goear.com/band/soundpicture/%s" % song.get('soundid')
            } for song in songs ]
            return HttpResponse(json.dumps(json_response), content_type="application/json")
        return HttpResponse('[]', content_type="application/json")



class Page(TemplateView):
    template_name = "music/legal.html"