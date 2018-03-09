const httpServer = require('http');
const url = require('url');

let routes = {
    'GET': {
        '/': (req, res)=> {
            res.writeHead(200, {'Content-type': 'text/html'});
            // res.write(req.cookie);
            res.end('<h2>Hello Router</h2>');
        },
        '/about': (req, res)=> {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.end('<h3>This is about page</h3>');
        },
        '/api/getinfo': (req, res)=> {
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(JSON.stringify(req.queryParam));
        },
    },
    'POST': {

    },
    'NA': (req, res)=> {
        res.writeHead(404);
        res.end('Content not found');
    },
};

function router(request, respone) {
    let baseURI = url.parse(request.url, true);

    let resolveRoute = routes[request.method][baseURI.pathname];

    if (resolveRoute != undefined) {
        request.queryParam = baseURI.query;
        resolveRoute(request, respone);
    }
    else {
        routes['NA'](request, respone);
    }
}

httpServer.createServer(router).listen(8080, ()=> {
   console.log('Server listen on port 8080');
});