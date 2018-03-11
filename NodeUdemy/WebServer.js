const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

let mimes = {
    '.htm': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.gif': 'image/gif',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
};

function webserver(req, res) {
    let baseURI = url.parse(req.url, true);
    let filePath = __dirname + (baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);

    fs.access(filePath, fs.F_OK, error => {
        if (!error) {
            fs.readFile(filePath, (error, content)=> {
                if (!error) {
                    let contentType = mimes[path.extname(filePath)];
                    res.writeHead(200, {'Content-type': contentType});
                    res.end(content, 'utf-8');
                }
                else {
                    res.writeHead(500);
                    res.end("The server could not read the file requested");
                }
            });
        }
        else {
            res.writeHead(404);
            res.end("The bitch");
        }
    });

}

http.createServer(webserver).listen(3000, ()=> {
    console.log('Server is starting on port 3000');
});