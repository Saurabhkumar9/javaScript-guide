// Basic variable types and data types

// Primitive Types
let name = "John"; // string
let age = 30; // number
let isStudent = true; // boolean
let height = 5.9; // number
let nothing = null; // null
let notDefined = undefined; // undefined
let sym = Symbol('id'); // symbol
let bigInt = 9007199254740991n; // bigint

// Dynamic Typing
let dynamicVar = "Hello";
console.log(typeof dynamicVar); // string
dynamicVar = 42;
console.log(typeof dynamicVar); // number
dynamicVar = true;
console.log(typeof dynamicVar); // boolean

// Arrays
let numbers = [1, 2, 3, 4, 5];
let names = ["Alice", "Bob", "Charlie"];
let mixed = [1, "hello", true, null];

// Objects
let person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    isEmployed: true,
    address: {
        street: "123 Main St",
        city: "New York"
    }
};

// Type Checking
console.log("\nType Checking:");
console.log("typeof 'hello':", typeof "hello");
console.log("typeof 123:", typeof 123);
console.log("typeof true:", typeof true);
console.log("typeof null:", typeof null); // known JavaScript quirk
console.log("typeof undefined:", typeof undefined);
console.log("typeof []:", typeof []); // object
console.log("typeof {}:", typeof {}); // object
console.log("Array.isArray([]):", Array.isArray([])); // true
console.log("Array.isArray({}):", Array.isArray({})); // false

// Type Conversion
console.log("\nType Conversion:");
console.log("String to Number:", Number("123"));
console.log("Number to String:", String(123));
console.log("Boolean to String:", String(true));
console.log("Truthy/Falsy to Boolean:", Boolean("hello"));
console.log("Falsy value to Boolean:", Boolean(""));
console.log("Parse Int:", parseInt("42px"));
console.log("Parse Float:", parseFloat("3.14em"));

// Template Literals
let firstName = "John";
let lastName = "Doe";
let fullName = `${firstName} ${lastName}`;
console.log("\nTemplate Literal:", fullName);

// Constants
const PI = 3.14159;
// PI = 3.14; // Error: Assignment to constant variable

// Variable Hoisting
console.log("\nHoisting Example:");
console.log(hoistedVar); // undefined (hoisted but not initialized)
var hoistedVar = "I'm hoisted";
console.log(hoistedVar); // "I'm hoisted"

// Let and Const (block-scoped)
{
    let blockScoped = "I'm block scoped";
    const constantBlock = "I'm constant in block";
    console.log("Inside block:", blockScoped, constantBlock);
}
// console.log(blockScoped); // Error: blockScoped is not defined

console.log("Basic Types Example Completed");