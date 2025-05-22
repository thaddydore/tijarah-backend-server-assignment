const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');

const pathToBook = path.join(process.cwd(), 'book');
const pathToBookFile = path.join(pathToBook, 'books.json');

const server = http.createServer((req, res) => {
	const method = req.method;
	const url = req.url;

	if (url === '/book' && method === 'GET') {
		return getBooks(req, res);
	}

	if (url === '/book' && method === 'POST') {
		return postBooks(req, res);
	}

	res.end('Hello World');
});

server.listen(3000, () => {
	console.log('Server is running on port 3000');
});

function getBooks(req, res) {
	const data = fs.readFileSync(pathToBookFile, 'utf-8');

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(data);
}

function postBooks(req, res) {
	let body = '';

	server.on('data', chunk => {
		body += chunk;
	});

	server.on('end', () => {
		console.log(body, 'this is the body of the request');
	});

	const data = fs.readFileSync(pathToBookFile, 'utf-8');

	fs.writeFileSync(pathToBookFile, JSON.stringify([...JSON.parse(data), body]));

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(data);
}

// http://localhost:3000/book GET
// http://localhost:3000/book POST
// http://localhost:3000/book/1 GET
// http://localhost:3000/book/1 DELETE
// http://localhost:3000/book/1 PUT
