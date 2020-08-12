const http = require('http');
const fs = require('fs');
const qs = require('querystring');
// console.log("Starting Application....");



const server = http.createServer((req, res) => {
    data = "";
    

    if (req.url === '/' && req.method === 'GET'){
        // res.write("Hello World!");
        // res.end();

        // create header
        res.writeHead(200, {'Content-Type' : 'text/html'});  
        // write header is used to define the response to send back to the request
        // this lets us maipulate the meta-data associated with the response to send to the client form our server

        // read the html form and write as response
        fs.readFile('./index.html', 'UTF-8', (err, data) => {
            if(err){
                console.log("Error", err);
                // throw err;
            }
            res.write(data);
            res.end();
            // console.log("Created");
        });
    }
    
    // handle POST method

    else if (req.method === 'POST'){
        req.on('data', (chunk) => {
            data += chunk.toString('utf-8');
            // data += chunk;
            console.log('collecting data....');
        });

        req.on('end', () => {
            fs.readFile('./index.html', 'UTF-8', (err, data) => {
                if(err){
                    console.log("Error", err);
                    // throw err;
                }
                res.write(data);
                res.end();
                // console.log("Created");
            });

            let result = qs.parse(data);
            filename = result.firstname + "_" + result.lastname + ".txt";
            console.log('Creating file: ', filename);
           
            let fileContent = `First Name: ${result.firstname}\nLast Name: ${result.lastname}\nUsername: ${result.username}\nPassword: ${result.password}\nEmail: ${result.email}`;
            fs.writeFile('./database/'+filename, fileContent,
            function(err){
                console.log("Saved!");
            });
        });

    }
    else{
        res.writeHead(404, {'Content-Type' : 'text/html'});
        res.end('<h2>404 ERROR</h2>');
    }

});

server.listen(8080);

console.log('Running server....');
