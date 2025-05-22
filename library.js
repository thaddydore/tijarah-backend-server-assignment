const path = require('node:path');
const os = require('os');
const fs = require('node:fs');

const bookToWrite = { name: 'The Alchemist', author: 'Paulo Coelho', year: '1988' };
const bookInStorage = [];

const pathToBook = path.join(process.cwd(), 'book');
const pathToBookFile = path.join(pathToBook, 'books.json');

if (!isFolderOrFileExist(pathToBook)) {
	createFolder(pathToBook);
}

function isFolderOrFileExist(path) {
	return fs.existsSync(path);
}

const data = fs.readFileSync(pathToBookFile, 'utf-8');

if (data) {
	bookInStorage.push(...JSON.parse(data));
}

fs.writeFileSync(pathToBookFile, JSON.stringify([bookToWrite, ...bookInStorage]));
function createFolder(path) {
	fs.mkdir(pathToBook, { recursive: true }, err => {
		if (err) return console.error('error trying to create the directory', err);
	});
}
