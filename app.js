const express = require('express');
const app = express();
const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');

const pathToBook = path.join(process.cwd(), 'book');
const pathToBookFile = path.join(pathToBook, 'books.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/book', middleware, getBooks);
app.post('/book', middleware, postBooks);

app.listen(4500, () => {
	console.log('Server is running on port 4500');
});

function getBooks(req, res) {
	const data = fs.readFileSync(pathToBookFile, 'utf-8');

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(data);
}

function postBooks(req, res) {
	const body = req.body;
	const pathParam = req.params;

	console.log(pathParam);
	console.log(body);

	const data = fs.readFileSync(pathToBookFile, 'utf-8');

	fs.writeFileSync(pathToBookFile, JSON.stringify([...JSON.parse(data), body]));

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(data);
}

function middleware(req, res, next) {
	console.log('Middleware is running and the methodis: ', req.method);
	console.log('Middleware is running and your ip is: ', req.ip);
	next();
}
