// ES5 Constructor Function (Prototype-based)
function OldCar(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
}

OldCar.prototype.getInfo = function() {
    return `${this.year} ${this.brand} ${this.model}`;
};

OldCar.prototype.startEngine = function() {
    console.log(`${this.brand} ${this.model} engine started`);
};

// ES6 Classes (Syntactic Sugar)
console.log("=== ES6 CLASSES ===");

// Basic Class
class Vehicle {
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
        this.speed = 0;
    }
    
    // Instance Method
    accelerate(amount) {
        this.speed += amount;
        console.log(`${this.brand} ${this.model} accelerated to ${this.speed} km/h`);
    }
    
    brake(amount) {
        this.speed = Math.max(0, this.speed - amount);
        console.log(`${this.brand} ${this.model} slowed to ${this.speed} km/h`);
    }
    
    // Getter
    get description() {
        return `${this.brand} ${this.model}`;
    }
    
    // Setter
    set modelYear(year) {
        if (year > 1886) { // First car invented year
            this.year = year;
        } else {
            console.log("Invalid year");
        }
    }
    
    // Static Method
    static compareSpeed(vehicle1, vehicle2) {
        return vehicle1.speed - vehicle2.speed;
    }
}

// Inheritance
class Car extends Vehicle {
    constructor(brand, model, doors) {
        super(brand, model); // Call parent constructor
        this.doors = doors;
        this.isEngineOn = false;
    }
    
    // Method Overriding
    startEngine() {
        this.isEngineOn = true;
        console.log(`${this.brand} ${this.model} engine started with key`);
    }
    
    // Additional Method
    honk() {
        console.log(`${this.brand} ${this.model} says: Beep Beep!`);
    }
}

class ElectricCar extends Car {
    constructor(brand, model, doors, batteryCapacity) {
        super(brand, model, doors);
        this.batteryCapacity = batteryCapacity;
        this.batteryLevel = 100;
    }
    
    // Method Overriding
    startEngine() {
        this.isEngineOn = true;
        console.log(`${this.brand} ${this.model} silently powered on`);
    }
    
    chargeBattery(amount) {
        this.batteryLevel = Math.min(100, this.batteryLevel + amount);
        console.log(`Battery charged to ${this.batteryLevel}%`);
    }
    
    // Additional Method
    getRange() {
        return (this.batteryLevel / 100) * this.batteryCapacity * 5; // 5km per percent
    }
}

// Abstract Class Pattern (using constructor check)
class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error("Cannot instantiate abstract class");
        }
    }
    
    getArea() {
        throw new Error("Method 'getArea()' must be implemented");
    }
    
    getPerimeter() {
        throw new Error("Method 'getPerimeter()' must be implemented");
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    
    getArea() {
        return Math.PI * this.radius ** 2;
    }
    
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    
    getArea() {
        return this.width * this.height;
    }
    
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
}

// Private Fields (ES2022)
class BankAccount {
    #balance = 0; // Private field
    #transactions = [];
    
    constructor(accountNumber, ownerName) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
    }
    
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            this.#transactions.push({
                type: 'DEPOSIT',
                amount,
                date: new Date()
            });
            console.log(`Deposited $${amount}`);
        }
    }
    
    withdraw(amount) {
        if (amount > 0 && amount <= this.#balance) {
            this.#balance -= amount;
            this.#transactions.push({
                type: 'WITHDRAWAL',
                amount,
                date: new Date()
            });
            console.log(`Withdrew $${amount}`);
            return amount;
        } else {
            console.log("Insufficient funds");
            return 0;
        }
    }
    
    getBalance() {
        return this.#balance;
    }
    
    getTransactionHistory() {
        return [...this.#transactions]; // Return copy
    }
}

// Mixin Pattern
const CanSwim = {
    swim() {
        console.log(`${this.name} is swimming`);
    }
};

const CanFly = {
    fly() {
        console.log(`${this.name} is flying`);
    }
};

class Animal {
    constructor(name) {
        this.name = name;
    }
    
    eat() {
        console.log(`${this.name} is eating`);
    }
}

class Duck extends Animal {}
Object.assign(Duck.prototype, CanSwim, CanFly);

// Singleton Pattern
class Logger {
    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }
        this.logs = [];
        Logger.instance = this;
    }
    
    log(message) {
        const timestamp = new Date().toISOString();
        this.logs.push({ message, timestamp });
        console.log(`[LOG ${timestamp}]: ${message}`);
    }
    
    getLogs() {
        return [...this.logs];
    }
}

// Factory Pattern
class VehicleFactory {
    static createVehicle(type, brand, model, ...args) {
        switch (type) {
            case 'car':
                return new Car(brand, model, ...args);
            case 'electric':
                return new ElectricCar(brand, model, ...args);
            default:
                throw new Error(`Unknown vehicle type: ${type}`);
        }
    }
}

// Testing Classes
console.log("\n=== TESTING CLASSES ===");

// ES5 Constructor
const oldCar = new OldCar("Toyota", "Camry", 2020);
console.log("ES5 Car:", oldCar.getInfo());

// ES6 Classes
const myCar = new Car("Toyota", "Camry", 4);
console.log("\nCar Instance:");
console.log("Description:", myCar.description);
myCar.startEngine();
myCar.accelerate(50);
myCar.honk();

const myElectricCar = new ElectricCar("Tesla", "Model 3", 4, 75);
console.log("\nElectric Car Instance:");
myElectricCar.startEngine();
myElectricCar.accelerate(60);
myElectricCar.chargeBattery(20);
console.log("Estimated range:", myElectricCar.getRange(), "km");

// Static Method
console.log("\nStatic Method:");
console.log("Speed difference:", Vehicle.compareSpeed(myCar, myElectricCar));

// Shapes
const circle = new Circle(5);
const rectangle = new Rectangle(10, 20);
console.log("\nShapes:");
console.log("Circle area:", circle.getArea().toFixed(2));
console.log("Circle perimeter:", circle.getPerimeter().toFixed(2));
console.log("Rectangle area:", rectangle.getArea());
console.log("Rectangle perimeter:", rectangle.getPerimeter());

// Bank Account with private fields
const account = new BankAccount("123456", "John Doe");
console.log("\nBank Account:");
account.deposit(1000);
account.withdraw(500);
console.log("Balance:", account.getBalance());
console.log("Transactions:", account.getTransactionHistory());

// Mixin
const duck = new Duck("Donald");
console.log("\nDuck with Mixins:");
duck.eat();
duck.swim();
duck.fly();

// Singleton
console.log("\nSingleton Logger:");
const logger1 = new Logger();
const logger2 = new Logger();
logger1.log("First log message");
logger2.log("Second log message");
console.log("Same instance?", logger1 === logger2);
console.log("All logs:", logger1.getLogs());

// Factory Pattern
console.log("\nFactory Pattern:");
const factoryCar = VehicleFactory.createVehicle('car', 'Honda', 'Civic', 4);
const factoryElectric = VehicleFactory.createVehicle('electric', 'Nissan', 'Leaf', 4, 40);
console.log("Factory Car:", factoryCar.description);
console.log("Factory Electric:", factoryElectric.description);