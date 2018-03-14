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

let fileAccess = (filepath)=> {
    return new Promise((resolve, reject)=> {
        fs.access(filepath, fs.F_OK, error=> {
           if (!error) {
               resolve(filepath);
           }
           else {
                reject(error);
           }
        });
    });
};

let fileReader = (filepath)=> {
    return new Promise((resolve, reject)=> {
        // console.log('File reader ', filepath);
        fs.readFile(filepath, (error, content)=> {
            if (!error) {
                resolve(content);
            }
            else {
                reject(error);
            }
        });
    });
};

function webserver(req, res) {
    let baseURI = url.parse(req.url, true);
    let filePath = __dirname + (baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);
    let contentType = mimes[path.extname(filePath)];

    fileAccess(filePath)
        .then(fileReader)
        .then(content => {
            res.writeHead(200, {'Content-type': contentType});
            res.end(content, 'utf-8');
        })
        .catch(error=> {
            res.writeHead(404, {'Content-type': 'application/json'});
            res.end(JSON.stringify(error));
        });

}

http.createServer(webserver).listen(3000, ()=> {
    console.log('Server is starting on port 3000');
});