import re
import urllib2
import unittest

def myp(x):
    print x;

def aprint(arr):
    len_a = len(arr);
    for x in range(0, len_a):
        print str(x) + ":" + arr[x]


class URLUtils:
    @staticmethod
    def rip_jpgs(url):
        req = None;
        try:
            req = urllib2.urlopen(url)
            urlcontents = req.read();
            has_jpg = filter(lambda x: re.search(r'(?i)jpg',x), urlcontents.split(' '))
            has_jpg = map(lambda x: re.sub(r'\r\n|\n', '', x), has_jpg);
            has_jpg = map(lambda x: re.sub(r'(href|src|alt) *= *[\"\']', r'', x), has_jpg);
            has_jpg = map(lambda x: re.sub(r'(?i)(jpg).*', r'\1', x), has_jpg);
            has_jpg = map(lambda x: re.sub(r'(?i)(\.jpg)', r'\1', x), has_jpg);
            has_jpg = map(lambda x: re.sub(r'.*[\"\']', r'', x), has_jpg);
            #has_jpg = map(lambda x: re.sub(r'(?i)(.*jpg).*', '\1', x), has_jpg);
            
#             has_jpg = map(lambda x: re.sub(r'.*src=[\'\"]*', r'', x), has_jpg);
#             has_jpg = map(lambda x: re.sub(r'.*href=[\'\"]*', r'', x), has_jpg);
#             has_jpg = map(lambda x: re.sub(r'[\'\"].*', '', x), has_jpg);
#             has_jpg = map(lambda x: re.sub(r'\r\n|\n', r'', x), has_jpg)
#             has_jpg = filter(lambda x: 'jpg' in x or 'JPG' in x, urlcontents.split('>'))
#             
            return has_jpg
        finally:
            if req is not None:
                req.close();
    
    


class URLUtilsTest(unittest.TestCase):
    def test_rip_jpgs(self):
        #url = 'http://www.reddit.com/r/pics'
        jpgs = URLUtils.rip_jpgs(url)
        aprint(jpgs);
        

