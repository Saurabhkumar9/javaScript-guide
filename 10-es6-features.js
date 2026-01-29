console.log("=== ES6+ FEATURES ===");

// ================================================
// LET AND CONST

console.log("\n=== LET AND CONST ===");

// let - block scoped, can be reassigned
let variableLet = "I can change";
variableLet = "Changed value";
console.log("let variable:", variableLet);

// const - block scoped, cannot be reassigned
const variableConst = "I cannot change";
// variableConst = "Try to change"; // Error: Assignment to constant variable
console.log("const variable:", variableConst);

// Block scope example
{
    let blockScoped = "Only in this block";
    const blockConst = "Also only here";
    console.log("Inside block:", blockScoped, blockConst);
}
// console.log(blockScoped); // Error: blockScoped is not defined

// ================================================
// ARROW FUNCTIONS

console.log("\n=== ARROW FUNCTIONS ===");

// Traditional function
function addTraditional(a, b) {
    return a + b;
}

// Arrow function
const addArrow = (a, b) => {
    return a + b;
};

// Arrow function with implicit return
const addImplicit = (a, b) => a + b;

// Arrow function with single parameter (no parentheses needed)
const square = x => x * x;

// Arrow function with no parameters
const greet = () => "Hello!";

// Arrow functions and 'this'
const person = {
    name: "John",
    traditionalGreet: function() {
        console.log("Traditional:", this.name);
    },
    arrowGreet: () => {
        // 'this' refers to outer scope, not person object
        console.log("Arrow:", this.name); // undefined (or window.name in browser)
    }
};

person.traditionalGreet();
person.arrowGreet();

// ================================================
// TEMPLATE LITERALS

console.log("\n=== TEMPLATE LITERALS ===");

const firstName = "John";
const lastName = "Doe";
const age = 30;

// Traditional concatenation
const oldWay = "Name: " + firstName + " " + lastName + ", Age: " + age;

// Template literals
const newWay = `Name: ${firstName} ${lastName}, Age: ${age}`;
console.log("Template literal:", newWay);

// Multi-line strings
const multiLine = `
    This is a
    multi-line
    string
`;
console.log("Multi-line:", multiLine);

// Expressions in templates
const price = 19.99;
const quantity = 3;
const total = `Total: $${(price * quantity).toFixed(2)}`;
console.log("Expression in template:", total);

// Tagged templates
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => {
        const value = values[i] ? `<strong>${values[i]}</strong>` : '';
        return result + str + value;
    }, '');
}

const taggedResult = highlight`Hello ${firstName}, you are ${age} years old.`;
console.log("Tagged template:", taggedResult);

// ================================================
// DESTRUCTURING

console.log("\n=== DESTRUCTURING ===");

// Array destructuring
const colors = ["red", "green", "blue", "yellow"];
const [firstColor, secondColor, ...restColors] = colors;
console.log("Array destructuring:", firstColor, secondColor, restColors);

// Swapping variables
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log("Swapped:", a, b); // 2, 1

// Object destructuring
const user = {
    name: "Alice",
    age: 25,
    email: "alice@example.com",
    address: {
        city: "New York",
        country: "USA"
    }
};

const { name, email: userEmail, address: { city } } = user;
console.log("Object destructuring:", name, userEmail, city);

// Function parameter destructuring
function printUser({ name, age }) {
    console.log(`User: ${name}, ${age} years old`);
}
printUser(user);

// Default values in destructuring
const { phone = "N/A", ...otherInfo } = user;
console.log("With default:", phone);
console.log("Rest operator:", otherInfo);

// ================================================
// DEFAULT PARAMETERS

console.log("\n=== DEFAULT PARAMETERS ===");

function greetPerson(name = "Guest", greeting = "Hello") {
    return `${greeting}, ${name}!`;
}

console.log("Default params:", greetPerson());
console.log("Default params:", greetPerson("John"));
console.log("Default params:", greetPerson("Alice", "Good morning"));

// Destructuring with default parameters
function createUser({ name = "Anonymous", age = 18, isAdmin = false } = {}) {
    return { name, age, isAdmin };
}

console.log("Destructuring defaults:", createUser());
console.log("Destructuring defaults:", createUser({ name: "Bob" }));

// ================================================
// REST AND SPREAD OPERATORS

console.log("\n=== REST & SPREAD ===");

// Rest operator (...)
function sumAll(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log("Rest operator:", sumAll(1, 2, 3, 4, 5));

// Spread operator (...)
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log("Spread arrays:", combined);

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2, e: 5 };
console.log("Spread objects:", merged);

// Copy arrays and objects
const original = [1, 2, 3];
const copy = [...original]; // Shallow copy
console.log("Copy array:", copy, "Same?", original === copy);

const originalObj = { x: 1, y: 2 };
const copyObj = { ...originalObj }; // Shallow copy
console.log("Copy object:", copyObj, "Same?", originalObj === copyObj);

// ================================================
// ENHANCED OBJECT LITERALS

console.log("\n=== ENHANCED OBJECT LITERALS ===");

// Property shorthand
const name2 = "John";
const age2 = 30;
const person2 = { name2, age2 }; // Instead of {name2: name2, age2: age2}
console.log("Property shorthand:", person2);

// Method shorthand
const calculator = {
    add(a, b) { // Instead of add: function(a, b)
        return a + b;
    },
    multiply(a, b) {
        return a * b;
    }
};
console.log("Method shorthand:", calculator.add(5, 3));

// Computed property names
const propName = "dynamicProperty";
const dynamicObj = {
    [propName]: "This is dynamic",
    [`${propName}2`]: "This is also dynamic"
};
console.log("Computed properties:", dynamicObj);

// ================================================
// SYMBOLS

console.log("\n=== SYMBOLS ===");

// Creating symbols
const sym1 = Symbol();
const sym2 = Symbol("description");
const sym3 = Symbol("description");

console.log("Symbols created");
console.log("Symbol with description:", sym2.toString());
console.log("Same description, different symbols?", sym2 === sym3); // false

// Using symbols as object keys
const id = Symbol("id");
const user3 = {
    [id]: 123,
    name: "John"
};

console.log("Symbol as key:", user3[id]);
console.log("Symbols not in Object.keys:", Object.keys(user3));
console.log("Symbols in Object.getOwnPropertySymbols:", Object.getOwnPropertySymbols(user3));

// Well-known symbols
const iterableObj = {
    [Symbol.iterator]: function* () {
        yield 1;
        yield 2;
        yield 3;
    }
};
console.log("Using Symbol.iterator:", [...iterableObj]);

// ================================================
// MAPS AND SETS

console.log("\n=== MAPS & SETS ===");

// Map (key-value pairs, keys can be any type)
const userMap = new Map();
userMap.set("name", "Alice");
userMap.set(123, "User ID");
userMap.set({}, "Object as key");

console.log("Map size:", userMap.size);
console.log("Get from map:", userMap.get("name"));
console.log("Has key?", userMap.has(123));

// Iterating Map
for (let [key, value] of userMap) {
    console.log(`Map entry: ${String(key)} => ${value}`);
}

// Set (unique values)
const uniqueNumbers = new Set([1, 2, 2, 3, 3, 4, 4]);
console.log("Set size:", uniqueNumbers.size);
uniqueNumbers.add(5);
uniqueNumbers.add(5); // Duplicate, won't be added
console.log("Set after adds:", [...uniqueNumbers]);
console.log("Has 3?", uniqueNumbers.has(3));

// WeakMap and WeakSet (for memory management)
const weakMap = new WeakMap();
const objKey = {};
weakMap.set(objKey, "data");
// objKey = null; // Entry will be garbage collected

// ================================================
// PROMISES (Already covered in detail in async-await.js)

console.log("\n=== PROMISES (Brief) ===");

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.5 ? resolve("Success!") : reject("Error!");
    }, 1000);
});

promise
    .then(result => console.log("Promise result:", result))
    .catch(error => console.log("Promise error:", error));

// ================================================
// MODULES (Already covered in modules.js)

console.log("\n=== MODULES (Brief) ===");
console.log("See modules.js for detailed examples");

// ================================================
// OTHER ES6+ FEATURES

console.log("\n=== OTHER FEATURES ===");

// String methods
const str = "Hello World";
console.log("String startsWith:", str.startsWith("Hello"));
console.log("String endsWith:", str.endsWith("World"));
console.log("String includes:", str.includes("lo"));
console.log("String repeat:", "Ha".repeat(3));

// Number methods
console.log("Number.isNaN:", Number.isNaN(NaN));
console.log("Number.isFinite:", Number.isFinite(42));
console.log("Number.isInteger:", Number.isInteger(42.5));

// Array methods
const numbersArray = [1, 2, 3, 4, 5];
console.log("Array.find:", numbersArray.find(x => x > 3));
console.log("Array.findIndex:", numbersArray.findIndex(x => x > 3));
console.log("Array.includes:", numbersArray.includes(3));

// Object methods
const source = { a: 1 };
const target = { b: 2 };
console.log("Object.assign:", Object.assign({}, source, target));
console.log("Object.entries:", Object.entries({ x: 1, y: 2 }));
console.log("Object.fromEntries:", Object.fromEntries([['a', 1], ['b', 2]]));

// Optional Chaining (ES2020)
const nested = { a: { b: { c: 42 } } };
console.log("Optional chaining:", nested?.a?.b?.c);
console.log("Optional chaining (undefined):", nested?.a?.b?.d?.e);

// Nullish Coalescing (ES2020)
const value = null;
const result = value ?? "default";
console.log("Nullish coalescing:", result);

// Logical Assignment (ES2021)
let x1 = 0;
let y1 = 5;
x1 ||= y1; // x1 = x1 || y1
console.log("Logical OR assignment:", x1);

let x2 = 10;
let y2 = 5;
x2 &&= y2; // x2 = x2 && y2
console.log("Logical AND assignment:", x2);

let x3 = null;
let y3 = 5;
x3 ??= y3; // x3 = x3 ?? y3
console.log("Nullish assignment:", x3);

// Top-level await (ES2022, in modules)
// await someAsyncFunction(); // Can use await outside async function in modules

console.log("\nES6+ features examples completed!");