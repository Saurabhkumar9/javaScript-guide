console.log("=== ADVANCED JAVASCRIPT CONCEPTS ===");

// ================================================
// CLOSURES

console.log("\n=== CLOSURES ===");

function createCounter() {
    let count = 0; // Private variable
    
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
        },
        reset: function() {
            count = 0;
            return count;
        }
    };
}

const counter = createCounter();
console.log("Closure counter:");
console.log("Increment:", counter.increment()); // 1
console.log("Increment:", counter.increment()); // 2
console.log("Decrement:", counter.decrement()); // 1
console.log("Get count:", counter.getCount());  // 1

// Module pattern with closure
const calculatorModule = (function() {
    let memory = 0;
    
    function add(a, b) {
        return a + b;
    }
    
    function subtract(a, b) {
        return a - b;
    }
    
    function storeInMemory(value) {
        memory = value;
    }
    
    function recallMemory() {
        return memory;
    }
    
    function clearMemory() {
        memory = 0;
    }
    
    return {
        add,
        subtract,
        storeInMemory,
        recallMemory,
        clearMemory
    };
})();

console.log("\nModule pattern:");
console.log("Add:", calculatorModule.add(5, 3));
calculatorModule.storeInMemory(42);
console.log("Memory:", calculatorModule.recallMemory());

// ================================================
// CURRYING

console.log("\n=== CURRYING ===");

// Regular function
function multiply(a, b, c) {
    return a * b * c;
}

// Curried version
function curryMultiply(a) {
    return function(b) {
        return function(c) {
            return a * b * c;
        };
    };
}

// Using curried function
const curriedResult = curryMultiply(2)(3)(4);
console.log("Curried multiplication:", curriedResult);

// Partial application
const multiplyByTwo = curryMultiply(2);
const multiplyByTwoAndThree = multiplyByTwo(3);
console.log("Partial application:", multiplyByTwoAndThree(4)); // 24
console.log("Partial application:", multiplyByTwoAndThree(5)); // 30

// Generic curry function
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

const curriedAdd = curry((a, b, c) => a + b + c);
console.log("Generic curry:", curriedAdd(1)(2)(3)); // 6
console.log("Generic curry:", curriedAdd(1, 2)(3)); // 6
console.log("Generic curry:", curriedAdd(1)(2, 3)); // 6

// ================================================
// FUNCTION COMPOSITION

console.log("\n=== FUNCTION COMPOSITION ===");

function compose(...fns) {
    return function(x) {
        return fns.reduceRight((acc, fn) => fn(acc), x);
    };
}

function pipe(...fns) {
    return function(x) {
        return fns.reduce((acc, fn) => fn(acc), x);
    };
}

// Example functions
const add5 = x => x + 5;
const multiply3 = x => x * 3;
const subtract2 = x => x - 2;
const square = x => x * x;

// Compose: right to left (subtract2 -> multiply3 -> add5 -> square)
const composed = compose(subtract2, multiply3, add5, square);
console.log("Compose (square -> add5 -> multiply3 -> subtract2):", composed(2));

// Pipe: left to right (square -> add5 -> multiply3 -> subtract2)
const piped = pipe(square, add5, multiply3, subtract2);
console.log("Pipe (square -> add5 -> multiply3 -> subtract2):", piped(2));

// ================================================
// MEMOIZATION

console.log("\n=== MEMOIZATION ===");

function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log("Returning cached result for", args);
            return cache.get(key);
        }
        
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// Expensive calculation
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Memoized version
const memoizedFibonacci = memoize(function(n) {
    if (n <= 1) return n;
    return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
});

console.log("\nWithout memoization (slow):");
console.time("Without memo");
console.log("fib(10):", fibonacci(10));
console.timeEnd("Without memo");

console.log("\nWith memoization (fast):");
console.time("With memo");
console.log("memoFib(10):", memoizedFibonacci(10));
console.timeEnd("With memo");

console.time("Memoized again");
console.log("memoFib(10) again:", memoizedFibonacci(10));
console.timeEnd("Memoized again");

// ================================================
// THROTTLING AND DEBOUNCING

console.log("\n=== THROTTLING & DEBOUNCING ===");

// Throttle: Execute at most once per time period
function throttle(fn, delay) {
    let lastCall = 0;
    let timeoutId;
    
    return function(...args) {
        const now = Date.now();
        const timeSinceLastCall = now - lastCall;
        
        clearTimeout(timeoutId);
        
        if (timeSinceLastCall >= delay) {
            lastCall = now;
            fn.apply(this, args);
        } else {
            timeoutId = setTimeout(() => {
                lastCall = Date.now();
                fn.apply(this, args);
            }, delay - timeSinceLastCall);
        }
    };
}

// Debounce: Execute after no calls for delay period
function debounce(fn, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Example usage
const throttledLog = throttle((msg) => {
    console.log("Throttled:", msg, Date.now());
}, 1000);

const debouncedLog = debounce((msg) => {
    console.log("Debounced:", msg, Date.now());
}, 1000);

console.log("Throttle test (click fast):");
// Simulate rapid calls
for (let i = 0; i < 5; i++) {
    setTimeout(() => throttledLog(`Call ${i + 1}`), i * 200);
}

console.log("\nDebounce test (type fast):");
// Simulate rapid typing
for (let i = 0; i < 5; i++) {
    setTimeout(() => debouncedLog(`Type ${i + 1}`), i * 200);
}

// ================================================
// OBSERVER PATTERN

console.log("\n=== OBSERVER PATTERN ===");

class Observable {
    constructor() {
        this.observers = [];
    }
    
    subscribe(observer) {
        this.observers.push(observer);
        return () => {
            this.observers = this.observers.filter(obs => obs !== observer);
        };
    }
    
    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}

// Usage
const stockObservable = new Observable();

const unsubscribe1 = stockObservable.subscribe(price => {
    console.log("Observer 1: Stock price updated to", price);
});

const unsubscribe2 = stockObservable.subscribe(price => {
    console.log("Observer 2: New price is", price);
});

console.log("\nNotifying observers:");
stockObservable.notify(100);
stockObservable.notify(105);

// Unsubscribe first observer
unsubscribe1();

console.log("\nAfter unsubscribing observer 1:");
stockObservable.notify(110);

// ================================================
// PROXY AND REFLECT

console.log("\n=== PROXY & REFLECT ===");

const targetObject = {
    name: "John",
    age: 30
};

const handler = {
    get: function(target, property, receiver) {
        console.log(`Getting property "${property}"`);
        if (property in target) {
            return Reflect.get(target, property, receiver);
        }
        return `Property "${property}" not found`;
    },
    
    set: function(target, property, value, receiver) {
        console.log(`Setting property "${property}" to "${value}"`);
        
        if (property === 'age' && (typeof value !== 'number' || value < 0)) {
            throw new Error("Age must be a positive number");
        }
        
        return Reflect.set(target, property, value, receiver);
    },
    
    has: function(target, property) {
        console.log(`Checking if has property "${property}"`);
        return Reflect.has(target, property);
    },
    
    deleteProperty: function(target, property) {
        console.log(`Deleting property "${property}"`);
        return Reflect.deleteProperty(target, property);
    }
};

const proxy = new Proxy(targetObject, handler);

console.log("Proxy get:", proxy.name); // Logs and returns "John"
console.log("Proxy get non-existent:", proxy.address); // Logs and returns message

try {
    proxy.age = -5; // Throws error
} catch (error) {
    console.log("Proxy set error:", error.message);
}

proxy.age = 31; // Logs and sets
console.log("Proxy has 'name':", 'name' in proxy); // Logs and returns true

delete proxy.age; // Logs and deletes
console.log("After delete:", proxy.age);

// ================================================
// GENERATORS

console.log("\n=== GENERATORS ===");

function* numberGenerator() {
    let num = 1;
    while (true) {
        const reset = yield num;
        if (reset) {
            num = 1;
        } else {
            num++;
        }
    }
}

const gen = numberGenerator();
console.log("Generator:", gen.next().value); // 1
console.log("Generator:", gen.next().value); // 2
console.log("Generator:", gen.next().value); // 3
console.log("Generator reset:", gen.next(true).value); // 1 (reset)
console.log("Generator:", gen.next().value); // 2

// Generator for async operations
function* asyncGenerator() {
    try {
        const result1 = yield fetchData(1);
        console.log("Result 1:", result1);
        
        const result2 = yield fetchData(2);
        console.log("Result 2:", result2);
        
        return "All done";
    } catch (error) {
        console.error("Generator error:", error);
    }
}

function fetchData(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Data ${id}`);
        }, 1000);
    });
}

// Runner for async generator
function runAsyncGenerator(genFunc) {
    const generator = genFunc();
    
    function handle(result) {
        if (result.done) return Promise.resolve(result.value);
        
        return Promise.resolve(result.value)
            .then(res => handle(generator.next(res)))
            .catch(err => handle(generator.throw(err)));
    }
    
    return handle(generator.next());
}

runAsyncGenerator(asyncGenerator).then(finalResult => {
    console.log("Async generator completed:", finalResult);
});

// ================================================
// WEB WORKERS (Browser only)

console.log("\n=== WEB WORKERS (Concept) ===");

if (typeof Worker !== 'undefined') {
    console.log("Web Workers are supported in this environment");
    
    // Example worker creation (would be in separate file)
    /*
    // main.js
    const worker = new Worker('worker.js');
    
    worker.postMessage({ type: 'CALCULATE', data: [1, 2, 3, 4, 5] });
    
    worker.onmessage = function(event) {
        console.log('Worker result:', event.data);
    };
    
    worker.onerror = function(error) {
        console.error('Worker error:', error);
    };
    
    // worker.js
    self.onmessage = function(event) {
        if (event.data.type === 'CALCULATE') {
            const result = event.data.data.reduce((a, b) => a + b, 0);
            self.postMessage(result);
        }
    };
    */
} else {
    console.log("Web Workers not supported");
}

// ================================================
// SERVICE WORKERS (Browser only - for PWA)

console.log("\n=== SERVICE WORKERS (Concept) ===");

if ('serviceWorker' in navigator) {
    console.log("Service Workers are supported");
    
    // Registration example
    /*
    navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log('ServiceWorker registered:', registration);
        })
        .catch(error => {
            console.error('ServiceWorker registration failed:', error);
        });
    */
}

console.log("\nAdvanced concepts examples completed!");