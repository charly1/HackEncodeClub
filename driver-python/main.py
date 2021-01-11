# Python 3 server example
from http.server import BaseHTTPRequestHandler, HTTPServer
from webbrowser import open as open_webpage
import time
import threading
from pathlib import Path
from mimelib import url as mime
from urllib.parse import urlparse
import json
import tkinter as tk
import tkinter.ttk as ttk

# ------------------------- changeable parameters -------------------------
hostName = "localhost"
serverPort = 3000

use_binance = True # binance test or ropsten
use_working_contract = True
# ------------------------- end of changeable parameters ------------------

software_contract_adr = ""
app = None
webServerData = {}

if use_binance and use_working_contract:
    software_contract_adr = "0x0440829FeDcf48f26F77c2C2dBb49a14fa286111"
elif (not use_binance) and use_working_contract:
    software_contract_adr = "0xc3Fe598B1D56aCaa8Ce7c5468230228E4D614120"
elif use_binance and (not use_working_contract):
    software_contract_adr = "0x0596762baE34B9A1e16E2c4c56318EdE6867fb63"
else: 
    software_contract_adr = "0xe4bfA4cA25D3C8E88C4E50C7AeF148685a53b988"

url_to_open = "http://" + hostName + ":" + str(serverPort) + "?contract=" + software_contract_adr + "&network=" + ("binance" if use_binance else "ropsten")

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        url = urlparse(self.path) # parse url, query and all url possible stuff

        if url.path == '/':
            file = Path('public/html/index.html')
        elif url.path[:7] == '/public':
            file = Path(url.path[1:])
        else:
            file = Path('file.notexists')

        if file.exists():
            self.send_response(200)
            self.send_header('Content-type', mime(str(file.absolute())).mime_type)
            self.end_headers()
            self.wfile.write(file.read_bytes())

        else:
            self.send_response(404)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(Path('public/html/404.html').read_bytes())

    def do_POST(self):
        url = urlparse(self.path) # parse url, query and all url possible stuff

        if url.path == '/check_owner':
            try:
                content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
                post_data = json.loads(self.rfile.read(content_length)) # <--- Gets the data itself

                self.send_response(200)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(b'{"status":"ok"}')

                if 'is_valid' in post_data:
                    if post_data['is_valid']:
                        print("successfully verified the authencity of the license")
                        license_check(True)
                    else:
                        print("failed to verify license authencity: invalid license")
                        license_check(False)

            except:
                self.send_response(400)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(b'{"status":"incorrect data format"}')

        else:
            self.send_response(404)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"status":"not found"}')



def webserver_start(data):
    data['webServer'] = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))
    
    try:
        data['webServer'].serve_forever()
    except KeyboardInterrupt:
        pass




class Ui:
    def __init__(self, master=None):
        # build ui
        self.frame_1 = ttk.Frame(master)
        self.button_load_license = ttk.Button(self.frame_1)
        self.button_load_license.config(text='Load License')
        self.button_load_license.pack(side='top')
        self.button_load_license.configure(command=self.cb_button_clicked)
        self.label_license = ttk.Label(self.frame_1)
        self.label_license.config(text='License state: not load for now.')
        self.label_license.pack(side='top')
        self.frame_1.config(height='400', width='400')
        self.frame_1.pack(side='top')

        # Main widget
        self.mainwindow = self.frame_1

    def cb_button_clicked(self):
        print("button clicked")
        open_webpage(url_to_open)
        self.setLabelText("License is loading..")

    def run(self):
        self.mainwindow.mainloop()

    def setLabelText(self, text):
        app.label_license.config(text=text)
    

def license_check(valid):
    if valid:
        app.setLabelText("license is valid")
    else:
        app.setLabelText("license is invalid")



if __name__ == "__main__":

    # start webserver
    webserver_thread = threading.Thread(target=webserver_start, args=(webServerData,))
    webserver_thread.start()

    # start ui
    root = tk.Tk()
    app = Ui(root)
    app.run()

    webServerData['webServer'].shutdown()
    webServerData['webServer'].server_close()

    print("Server stopped.")
