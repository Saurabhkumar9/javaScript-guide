// Function Declaration (Hoisted)
function greet(name) {
    return `Hello, ${name}!`;
}

// Function Expression (Not hoisted)
const multiply = function(x, y) {
    return x * y;
};

// Arrow Function (ES6)
const divide = (x, y) => {
    return x / y;
};

// Arrow Function with implicit return
const square = x => x * x;

// Arrow Function with multiple parameters
const add = (a, b) => a + b;

// Arrow Function with no parameters
const sayHello = () => "Hello!";

// Default Parameters
function createGreeting(name, greeting = "Hello") {
    return `${greeting}, ${name}!`;
}

// Rest Parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

// Arguments Object (pre-ES6)
function listArguments() {
    console.log("Number of arguments:", arguments.length);
    for (let i = 0; i < arguments.length; i++) {
        console.log(`Argument ${i}:`, arguments[i]);
    }
}

// Higher-Order Functions
function createMultiplier(factor) {
    return function(x) {
        return x * factor;
    };
}

// Callback Functions
function processData(data, callback) {
    const processed = data.toUpperCase();
    callback(processed);
}

// Immediately Invoked Function Expression (IIFE)
(function() {
    console.log("IIFE executed immediately!");
})();

// IIFE with parameters
(function(name) {
    console.log(`Hello ${name} from IIFE!`);
})("Alice");

// Generator Functions
function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

// Async Functions
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

// Recursive Function
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Memoization Function
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            console.log("Returning cached result");
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

// Closure Example
function createCounter() {
    let count = 0;
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
}

// Function Methods (call, apply, bind)
function introduce(location, time) {
    return `${this.name} from ${location} at ${time}`;
}

const person = { name: "John" };

// Using call
console.log("Using call:", introduce.call(person, "New York", "10 AM"));

// Using apply
console.log("Using apply:", introduce.apply(person, ["London", "3 PM"]));

// Using bind
const boundIntroduce = introduce.bind(person, "Paris");
console.log("Using bind:", boundIntroduce("9 AM"));

// Testing functions
console.log("Functions Example:");
console.log("Greet:", greet("Alice"));
console.log("Multiply:", multiply(4, 5));
console.log("Divide:", divide(10, 2));
console.log("Square:", square(5));
console.log("Add:", add(10, 5));
console.log("Say Hello:", sayHello());
console.log("Default Greeting:", createGreeting("Bob"));
console.log("Custom Greeting:", createGreeting("Charlie", "Good morning"));
console.log("Sum:", sum(1, 2, 3, 4, 5));

listArguments(1, "hello", true, [1, 2, 3]);

const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log("Double 5:", double(5));
console.log("Triple 5:", triple(5));

processData("hello world", function(result) {
    console.log("Processed data:", result);
});

console.log("Factorial of 5:", factorial(5));

// Using memoization
const memoizedFactorial = memoize(factorial);
console.log("Memoized factorial 5:", memoizedFactorial(5));
console.log("Memoized factorial 5 (cached):", memoizedFactorial(5));

// Using closure
const counter = createCounter();
console.log("Counter initial:", counter.getCount());
console.log("Counter increment:", counter.increment());
console.log("Counter increment:", counter.increment());
console.log("Counter decrement:", counter.decrement());
console.log("Counter final:", counter.getCount());

// Using generator
const gen = numberGenerator();
console.log("Generator:", gen.next().value);
console.log("Generator:", gen.next().value);
console.log("Generator:", gen.next().value);