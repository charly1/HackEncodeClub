# Python 3 server example
from http.server import BaseHTTPRequestHandler, HTTPServer
from webbrowser import open as open_webpage
import time
import threading
import queue as Queue

hostName = "localhost"
serverPort = 8080
webServerData = {}

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("<html><head><title>https://pythonbasics.org</title></head>", "utf-8"))
        self.wfile.write(bytes("<p>Request: %s</p>" % self.path, "utf-8"))
        self.wfile.write(bytes("<body>", "utf-8"))
        self.wfile.write(bytes("<p>This is an example web server.</p>", "utf-8"))
        self.wfile.write(bytes("</body></html>", "utf-8"))


def webserver_host(data):
    data['webServer'] = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    # try:
    data['webServer'].serve_forever()


import tkinter as tk
from tkinter import filedialog
from tkinter import ttk
root = tk.Tk()

def cb():
    print("button clicked")
    open_webpage("http://" + hostName + ":" + str(serverPort))

label = tk.Button(root, text="open web page", command=cb) # Create a text label
label.pack(padx=20, pady=20) # Pack it into the window



if __name__ == "__main__":        
    webserver_thread = threading.Thread(target=webserver_host, args=(webServerData,))

    webserver_thread.start()

    root.mainloop()

    webServerData['webServer'].shutdown()
    webServerData['webServer'].server_close()

    print("Server stopped.")
