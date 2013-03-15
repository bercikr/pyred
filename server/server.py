
import SimpleHTTPServer
import SocketServer
import re
import urllib

PORT = 8989

class MyServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_GET(self):
        request_path = re.sub(r'^.*GET ', '', self.path);
        request_path = re.sub(r'HTTP.*', '', request_path);
        url = urllib.urlopen('http://reddit.com' + request_path);
        print url.info();
        f = self.wrapStream(url);
        if f:
            self.copyfile(f, self.wfile);
            f.close();

    def wrapStream(self, urlref):
        self.send_response(200);
        for key in urlref.info().keys():
            self.send_header(key, urlref.info()[key]);
        self.end_headers();
        return urlref


Handler = MyServerHandler;

httpd = SocketServer.ThreadingTCPServer(("", PORT), Handler)
print "starting server"
httpd.serve_forever();