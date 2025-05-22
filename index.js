// import name from '../../main.js'
const fs = require('fs');
const { greet } = require('./greeting');

const argument = process.argv[2];
const splittedArgument = argument?.split('=');
const flag = splittedArgument?.[0];
const value = splittedArgument?.[1];

if (flag !== '--isBusy') {
	console.log('You need to pass a flag --isBusy');
	process.exit(1);
}

const desiredValue = ['true', 'false'];

if (desiredValue.indexOf(value) === -1) {
	console.log('You need to pass a value of true or false');
	process.exit(1);
}

if (value === 'true') {
	console.log('We are skipping the program because user is busy');
	process.exit(1);
}

console.log('We are about running your script now');

console.log('Hello World');

console.log(greet('Bob'));

// global variable on a module
//__dirname, __filename, module, require
