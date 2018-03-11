let http = require('http');
let url = require('url');
let qs = require('querystring');

let routes = {
    'GET': {
        '/': (req, res)=> {
            res.writeHead(200, {
                'Content-type': 'text/html',
            });
            res.end("<h1>This is Main page</h1>");
        },
        '/about': (req, res)=> {
            res.writeHead(200, {
                'Content-type': 'text/html',
            });
            res.end("<h2>This is main page</h2>");
        },
        '/api/getinfo': (req, res)=> {
            res.writeHead(200, {
                'Content-type': 'application/json',
            });
            res.end(JSON.stringify(req.param));
        },
    },
    'POST': {
        '/api/login': (req, res)=> {
            let body = '';
            req.on('data', data => {
               body += data;
               if (body.length > 2097152) {
                   res.writeHead(413, {'Content-type': 'text/html'});
                   res.end('<h3>The file being uploaded exceeds the 2MB limit</h3>', ()=>{
                       req.connection.destroy();
                   });
               }
            });

            req.on('end', ()=> {
                console.log("uploaded");
                // let params = qs.parse(body);
                // console.log("Username: ", params['username']);
                // console.log("Password: ", params['password']);

            });
        }
    },
    'NA': (req, res)=> {
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end('<h2 style="color: red">Page not found</h2>')
    }
};

function router(req, res) {
    let baseURI = url.parse(req.url, true);
    let resolveRoute = routes[req.method][baseURI.pathname];

    if (resolveRoute != undefined){
        req.param = baseURI.query;
        resolveRoute(req, res);
    }
    else {
        routes['NA'](req, res);
    }
}

http.createServer(router).listen(8080, ()=> {
    console.log('Server is started on port 8080');
});