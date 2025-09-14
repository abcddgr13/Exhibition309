#!/usr/bin/env python3
import http.server
import socketserver
import os
import webbrowser

PORT = 5000
HOST = '0.0.0.0'

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer((HOST, PORT), MyHTTPRequestHandler) as httpd:
        print(f"Art Exhibition Server started at http://{HOST}:{PORT}/")
        print("Ctrl+C to stop")
        httpd.serve_forever()