const http = require('http');
const host = 'localhost';
const port = 8000;
const fs = require('fs').promises;

const books = JSON.stringify([
    { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling' },
]);
const author = JSON.stringify([
    { name: 'J.R.R. Tolkien' },
    { name: 'J.K. Rowling' },]);

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    switch (req.url) {
        case '/':
            fs.readFile(__dirname + '/index.html')
                .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        }); 
            break;
        case '/books':
            res.writeHead(200);
            res.end(books);
            break;
        case '/authors':
            res.writeHead(200);
            res.end(author);
            break;
        default:
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Resource not found' }));
            break;
}
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    });