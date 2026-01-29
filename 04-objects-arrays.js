// Object Creation
console.log("=== OBJECTS ===");

// Object Literal
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    isEmployed: true,
    address: {
        street: "123 Main St",
        city: "New York",
        country: "USA"
    },
    fullName: function() {
        return `${this.firstName} ${this.lastName}`;
    },
    greet() { // ES6 method shorthand
        return `Hello, my name is ${this.firstName}`;
    }
};

// Constructor Function
function Car(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.getInfo = function() {
        return `${this.year} ${this.brand} ${this.model}`;
    };
}

// ES6 Class (syntactic sugar over constructor)
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    
    makeSound() {
        return `${this.name} makes a sound`;
    }
    
    static isAnimal(obj) {
        return obj instanceof Animal;
    }
}

// Object Methods
console.log("\nObject Methods:");
console.log("Keys:", Object.keys(person));
console.log("Values:", Object.values(person));
console.log("Entries:", Object.entries(person));
console.log("Has property 'age':", person.hasOwnProperty('age'));
console.log("Has property 'salary':", person.hasOwnProperty('salary'));

// Object Manipulation
const newPerson = Object.assign({}, person, { age: 31 });
console.log("\nObject.assign:", newPerson);

const frozenPerson = Object.freeze({ ...person });
// frozenPerson.age = 32; // Error in strict mode

const sealedPerson = Object.seal({ ...person });
sealedPerson.age = 32; // Allowed
// sealedPerson.newProp = "test"; // Error

// Getters and Setters
const user = {
    _firstName: "",
    _lastName: "",
    
    get fullName() {
        return `${this._firstName} ${this._lastName}`;
    },
    
    set fullName(name) {
        const parts = name.split(" ");
        this._firstName = parts[0];
        this._lastName = parts[1] || "";
    }
};

user.fullName = "John Doe";
console.log("\nGetters/Setters:", user.fullName);

// Prototype Inheritance
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
};

const john = new Person("John", "Doe");
console.log("\nPrototype Inheritance:", john.getFullName());

// ================================================
// ARRAYS
console.log("\n\n=== ARRAYS ===");

// Array Creation
const numbers = [1, 2, 3, 4, 5];
const fruits = ["apple", "banana", "orange"];
const mixed = [1, "hello", true, null, { name: "John" }];

// Array Methods
console.log("\nArray Methods:");

// Adding/Removing Elements
fruits.push("grape"); // Add to end
console.log("After push:", fruits);

fruits.pop(); // Remove from end
console.log("After pop:", fruits);

fruits.unshift("mango"); // Add to beginning
console.log("After unshift:", fruits);

fruits.shift(); // Remove from beginning
console.log("After shift:", fruits);

// Slicing and Splicing
const sliced = fruits.slice(1, 3);
console.log("Slice (1,3):", sliced);

fruits.splice(1, 1, "kiwi", "peach");
console.log("After splice:", fruits);

// Iterating Arrays
console.log("\nIterating Arrays:");
fruits.forEach((fruit, index) => {
    console.log(`Fruit ${index}: ${fruit}`);
});

const doubled = numbers.map(num => num * 2);
console.log("Mapped (doubled):", doubled);

const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Filtered (even):", evenNumbers);

const sum = numbers.reduce((total, num) => total + num, 0);
console.log("Reduced (sum):", sum);

const hasEven = numbers.some(num => num % 2 === 0);
console.log("Some (has even):", hasEven);

const allPositive = numbers.every(num => num > 0);
console.log("Every (all positive):", allPositive);

// Finding Elements
const firstEven = numbers.find(num => num % 2 === 0);
console.log("Find (first even):", firstEven);

const firstEvenIndex = numbers.findIndex(num => num % 2 === 0);
console.log("Find Index (first even):", firstEvenIndex);

// Sorting
const unsorted = [5, 2, 8, 1, 9];
const sorted = [...unsorted].sort((a, b) => a - b);
console.log("Sorted numbers:", sorted);

const words = ["banana", "apple", "cherry"];
const sortedWords = [...words].sort();
console.log("Sorted words:", sortedWords);

// Reversing
const reversed = [...numbers].reverse();
console.log("Reversed:", reversed);

// Array.from and Array.of
const arrayFrom = Array.from("hello");
console.log("\nArray.from('hello'):", arrayFrom);

const arrayOf = Array.of(1, 2, 3, 4, 5);
console.log("Array.of(1,2,3,4,5):", arrayOf);

// Spread Operator with Arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log("Spread combined:", combined);

// Destructuring Arrays
const [first, second, ...rest] = numbers;
console.log("\nDestructuring:");
console.log("First:", first);
console.log("Second:", second);
console.log("Rest:", rest);

// Multi-dimensional Arrays
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log("\nMatrix[1][2]:", matrix[1][2]);

// Array Properties
console.log("\nArray Properties:");
console.log("Length:", numbers.length);
console.log("Is array?", Array.isArray(numbers));
console.log("Is array?", Array.isArray({}));

// Set and Map (ES6)
console.log("\n=== SET & MAP ===");

// Set (unique values)
const uniqueNumbers = new Set([1, 2, 2, 3, 3, 4]);
console.log("Set:", uniqueNumbers);
console.log("Set size:", uniqueNumbers.size);
uniqueNumbers.add(5);
console.log("After add:", uniqueNumbers);
console.log("Has 3?", uniqueNumbers.has(3));

// Map (key-value pairs)
const userMap = new Map();
userMap.set("name", "John");
userMap.set("age", 30);
userMap.set("isAdmin", true);
console.log("\nMap:", userMap);
console.log("Get name:", userMap.get("name"));
console.log("Has age?", userMap.has("age"));
console.log("Map size:", userMap.size);

// Iterating Map
console.log("\nIterating Map:");
for (let [key, value] of userMap) {
    console.log(`${key}: ${value}`);
}