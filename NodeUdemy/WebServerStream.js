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
        })
    });
};

let StreamFile = (filepath)=> {
    return new Promise((resolve, reject)=> {
        let fileStream = fs.createReadStream(filepath);

        fileStream.on('open', ()=> {
            resolve(fileStream);
        });

        fileStream.on('error', ()=> {
            reject(error);
        });
    });
};


let webserver = (req, res)=> {
    let baseURI = url.parse(req.url, true);
    let filePath = __dirname + (baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);
    let contentType = mimes[path.extname(filePath)];

    fileAccess(filePath)
        .then(StreamFile)
        .then(fileStream => {
            res.writeHead(200, {'Content-type': contentType});
            fileStream.pipe(res);
        })
        .catch(error=> {
            res.writeHead(404, {'Content-type': 'application/json'});
            res.end(JSON.stringify(error));
        });

};

http.createServer(webserver).listen(3000, ()=> {
    console.log('Server is starting on port 3000');
});