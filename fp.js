// The point of this assignment is not to use the functional elements that are part of your chosen language (JavScript/Python).
// But, rather, implement the functionality from scratch using pure functions and higher level functions.
// Do the implimentation in order as given.
// We have linked to info at MDN, this is just to give a sence of how the reduce,forEach,map and filter functions should work.
//
// 🛠️ Prerequisite:
// You must create an array persons that will contain the data from https://raw.githubusercontent.com/MM-203/misc/main/data/data.json
// This must be done before the first task
//
// ----------------------------------------------------------------------------------------------------------------------------------
// Bonus challenge 🎉 (a bit hard), the functions forEach, filter and map can all be created using the function reduce.
// If you feel up for a challenge, try doing so. NB! The bonus challenge is optional.
// ----------------------------------------------------------------------------------------------------------------------------------

const fs = require('fs');
const util = require('util');

fetch('https://raw.githubusercontent.com/MM-203/misc/main/data/data.json')
	.then((response) => response.json())
	.then((data) => {
		if (!fs.existsSync('data.json')) {
			fs.writeFileSync('data.json', JSON.stringify(data));
		}
	});

// 1
// Implement your own reduce function and count the number of people above the age of 50
// You can read about a reduce function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

const persons = JSON.parse(fs.readFileSync('data.json'));

const reduce = (func, init) => {
	let acc = init;
	for (let i = 0; i < persons.length; i++) {
		acc = func(acc, persons[i]);
	}
	return acc;
};

const count = reduce((acc, person) => {
	if (person.age > 50) {
		acc++;
	}
	return acc;
}, 0);

console.log(`[Number of people above the age of 50]: ${count}`);

// 2
// Implement your own forEach function and use it to greet all the people in the persons array (say Hi, persons name).
// Read about forEach https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

const forEach = (func) => {
	for (let i = 0; i < persons.length; i++) {
		func(persons[i]);
	}
};

forEach((person) => {
	console.log(`Hi, ${person.name}`);
});

// 3
// Implement your own map function and make everyone a year older.
// You can read about what the map function should do https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

const map = (func) => {
	const arr = [];
	for (let i = 0; i < persons.length; i++) {
		arr.push(func(persons[i]));
	}
	return arr;
};

const older = map((person) => {
	return { ...person, age: person.age + 1 };
});

console.log(util.inspect(older, { depth: null, colors: true }));

// 4
// Implement your own filter function, and use it to find evryone under the drinking age.
// Read about filter https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

const filter = (func) => {
	const arr = [];
	for (let i = 0; i < persons.length; i++) {
		if (func(persons[i])) {
			arr.push(persons[i]);
		}
	}
	return arr;
};

const underDrinkingAge = filter((person) => {
	return person.age < 18;
});

console.log(util.inspect(underDrinkingAge, { depth: null, colors: true }));

// 5
// Now create a function sum, that takes a list of numbers and returns the sum
// Try to use your previously created functions to make this function
// Sum the total age of persons using this new function
// NB! Do not manualy create the age listing

const sum = (arr) => {
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i];
	}
	return sum;
};

const ages = map((person) => {
	return person.age;
});

console.log(`The sum of all ages: ${sum(ages)} `);

// 6
// Now create a function average, that returns the average of a list of numbers
// Try to use your previously created functions to make this function
// calculate the average age of the persons using this function
// NB! Do not manualy create the age listing

const average = (arr) => {
	return sum(arr) / arr.length;
};

console.log(`The average age of all persons: ${average(ages)}`);

// 7
// Finaly create a max and a min function that respectivly returns the maximum value and the minimum value
// Only use previously created functions to acchive this.
// Then find the min and max age of ther persons.

const max = (arr) => {
	let max = arr[0];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] > max) max = arr[i];
	}
	return max;
};

const min = (arr) => {
	let min = arr[0];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] < min) min = arr[i];
	}
	return min;
};

console.log(`The max age of all persons: ${max(ages)}`);
console.log(`The min age of all persons: ${min(ages)}`);

// betterPrint is a function that takes output from an input function and prints it in a nice way
// You can use this function to print the output of your functions seperatly and see if they work as intended
// With the function name is in the top row and the output in the bottom row
// With a linebreak between each function
