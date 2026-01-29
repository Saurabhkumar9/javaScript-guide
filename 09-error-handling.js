console.log("=== ERROR HANDLING ===");

// ================================================
// BASIC ERROR HANDLING WITH TRY-CATCH

console.log("\n=== BASIC TRY-CATCH ===");

try {
    // Code that might throw an error
    const result = 10 / 0;
    console.log("Division result:", result);
    
    // This will throw an error
    undefinedFunction();
    
    console.log("This line won't execute");
} catch (error) {
    console.log("Caught an error:", error.message);
    console.log("Error name:", error.name);
    console.log("Error stack:", error.stack);
} finally {
    console.log("This always executes (cleanup code)");
}

// ================================================
// THROWING ERRORS

console.log("\n=== THROWING ERRORS ===");

function divideNumbers(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed");
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError("Both arguments must be numbers");
    }
    return a / b;
}

try {
    console.log("Divide 10 by 2:", divideNumbers(10, 2));
    console.log("Divide 10 by 0:", divideNumbers(10, 0)); // This will throw
} catch (error) {
    console.log("Division error:", error.message);
}

// Custom Error Class
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
        this.timestamp = new Date().toISOString();
    }
    
    toString() {
        return `${this.name}: ${this.message} (field: ${this.field})`;
    }
}

function validateUser(user) {
    if (!user.name) {
        throw new ValidationError("Name is required", "name");
    }
    if (!user.email || !user.email.includes('@')) {
        throw new ValidationError("Valid email is required", "email");
    }
    if (user.age && user.age < 18) {
        throw new ValidationError("Must be 18 or older", "age");
    }
}

try {
    validateUser({ name: "", email: "invalid", age: 16 });
} catch (error) {
    if (error instanceof ValidationError) {
        console.log("Validation failed:", error.toString());
        console.log("Field:", error.field);
        console.log("Timestamp:", error.timestamp);
    } else {
        console.log("Unknown error:", error);
    }
}

// ================================================
// ERROR TYPES

console.log("\n=== ERROR TYPES ===");

// ReferenceError
try {
    console.log(nonExistentVariable);
} catch (error) {
    console.log("ReferenceError:", error.message);
}

// TypeError
try {
    const num = 42;
    num(); // Trying to call a number as a function
} catch (error) {
    console.log("TypeError:", error.message);
}

// SyntaxError (caught at parse time, not runtime)
try {
    eval("console.log('hello"); // Missing closing quote
} catch (error) {
    console.log("SyntaxError:", error.message);
}

// RangeError
try {
    const arr = new Array(-1); // Invalid array length
} catch (error) {
    console.log("RangeError:", error.message);
}

// URIError
try {
    decodeURIComponent('%'); // Invalid URI component
} catch (error) {
    console.log("URIError:", error.message);
}

// ================================================
// PROMISE ERROR HANDLING

console.log("\n=== PROMISE ERROR HANDLING ===");

// Promise with .catch()
const promiseWithError = new Promise((resolve, reject) => {
    // Simulate async operation that fails
    setTimeout(() => {
        reject(new Error("Promise failed!"));
    }, 1000);
});

promiseWithError
    .then(result => {
        console.log("This won't run");
    })
    .catch(error => {
        console.log("Promise caught error:", error.message);
    })
    .finally(() => {
        console.log("Promise cleanup");
    });

// Async/await with try-catch
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`Attempt ${i + 1} to fetch ${url}`);
            
            // Simulate fetch that might fail
            if (Math.random() > 0.7) {
                throw new Error(`Network error on attempt ${i + 1}`);
            }
            
            // Simulate successful fetch
            return `Data from ${url}`;
            
        } catch (error) {
            console.log(`Attempt ${i + 1} failed:`, error.message);
            
            if (i === retries - 1) {
                throw new Error(`Failed after ${retries} attempts: ${error.message}`);
            }
            
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

(async () => {
    try {
        const data = await fetchWithRetry("https://api.example.com/data");
        console.log("Fetch successful:", data);
    } catch (error) {
        console.log("All retries failed:", error.message);
    }
})();

// ================================================
// GLOBAL ERROR HANDLING

console.log("\n=== GLOBAL ERROR HANDLING ===");

// Window error event (browser)
if (typeof window !== 'undefined') {
    window.addEventListener('error', function(event) {
        console.log('Global error caught:', event.message);
        console.log('Error at:', event.filename, event.lineno, event.colno);
        // You could send this to a logging service
        // event.preventDefault(); // Prevent default error handling
    });
    
    window.addEventListener('unhandledrejection', function(event) {
        console.log('Unhandled promise rejection:', event.reason);
        // event.preventDefault(); // Prevent default handling
    });
}

// Node.js uncaught exceptions
if (typeof process !== 'undefined') {
    process.on('uncaughtException', (error) => {
        console.error('Uncaught Exception:', error);
        // Don't exit immediately in production
        // process.exit(1);
    });
    
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });
}

// ================================================
// DEFENSIVE PROGRAMMING

console.log("\n=== DEFENSIVE PROGRAMMING ===");

// 1. Null/Undefined Checks
function safeGetProperty(obj, property) {
    if (!obj) {
        return null;
    }
    return obj[property] || null;
}

// 2. Default Parameters
function greetUser(name = "Guest") {
    return `Hello, ${name}!`;
}

// 3. Optional Chaining
const user = {
    profile: {
        name: "John",
        address: {
            city: "New York"
        }
    }
};

console.log("City (optional chaining):", user?.profile?.address?.city);
console.log("Non-existent:", user?.profile?.age?.years);

// 4. Nullish Coalescing
const config = {
    timeout: 0,
    retries: null
};

const timeout = config.timeout ?? 5000; // 0 (not 5000)
const retries = config.retries ?? 3; // 3
console.log("Timeout:", timeout, "Retries:", retries);

// ================================================
// ERROR LOGGING AND MONITORING

console.log("\n=== ERROR LOGGING ===");

class ErrorLogger {
    constructor() {
        this.logs = [];
    }
    
    log(error, context = {}) {
        const errorLog = {
            timestamp: new Date().toISOString(),
            message: error.message,
            name: error.name,
            stack: error.stack,
            context
        };
        
        this.logs.push(errorLog);
        
        // Log to console (in real app, send to server)
        console.error('Error logged:', errorLog);
        
        // Could send to external service
        // this.sendToMonitoringService(errorLog);
        
        return errorLog;
    }
    
    getLogs() {
        return [...this.logs];
    }
    
    clearLogs() {
        this.logs = [];
    }
}

// Usage
const logger = new ErrorLogger();

try {
    throw new Error("Test error for logging");
} catch (error) {
    logger.log(error, { userId: 123, action: "test" });
}

console.log("Error logs:", logger.getLogs());

// ================================================
// ERROR RECOVERY STRATEGIES

console.log("\n=== ERROR RECOVERY ===");

// 1. Retry Logic
async function retryOperation(operation, maxRetries = 3, delay = 1000) {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;
            console.log(`Attempt ${i + 1} failed:`, error.message);
            
            if (i < maxRetries - 1) {
                console.log(`Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw lastError;
}

// 2. Fallback Strategy
async function getDataWithFallback(primarySource, fallbackSource) {
    try {
        return await primarySource();
    } catch (error) {
        console.log("Primary source failed, trying fallback...");
        try {
            return await fallbackSource();
        } catch (fallbackError) {
            throw new Error(`Both sources failed: ${error.message}, ${fallbackError.message}`);
        }
    }
}

// 3. Circuit Breaker Pattern
class CircuitBreaker {
    constructor(operation, failureThreshold = 3, resetTimeout = 10000) {
        this.operation = operation;
        this.failureThreshold = failureThreshold;
        this.resetTimeout = resetTimeout;
        this.failureCount = 0;
        this.state = "CLOSED"; // CLOSED, OPEN, HALF_OPEN
        this.nextAttempt = 0;
    }
    
    async call(...args) {
        if (this.state === "OPEN") {
            if (Date.now() > this.nextAttempt) {
                this.state = "HALF_OPEN";
            } else {
                throw new Error("Circuit breaker is OPEN");
            }
        }
        
        try {
            const result = await this.operation(...args);
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failureCount = 0;
        this.state = "CLOSED";
    }
    
    onFailure() {
        this.failureCount++;
        if (this.failureCount >= this.failureThreshold) {
            this.state = "OPEN";
            this.nextAttempt = Date.now() + this.resetTimeout;
            console.log(`Circuit breaker OPEN until ${new Date(this.nextAttempt)}`);
        }
    }
}

// ================================================
// VALIDATION FUNCTIONS

console.log("\n=== VALIDATION ===");

function validateInput(input, rules) {
    const errors = [];
    
    for (const rule of rules) {
        try {
            rule.validate(input);
        } catch (error) {
            errors.push({
                field: rule.field,
                message: error.message
            });
        }
    }
    
    if (errors.length > 0) {
        throw new ValidationError("Input validation failed", errors);
    }
    
    return true;
}

// Example validation rules
const validationRules = [
    {
        field: "username",
        validate: (value) => {
            if (!value || value.trim().length === 0) {
                throw new Error("Username is required");
            }
            if (value.length < 3) {
                throw new Error("Username must be at least 3 characters");
            }
        }
    },
    {
        field: "email",
        validate: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                throw new Error("Invalid email format");
            }
        }
    }
];

try {
    validateInput({ username: "ab", email: "invalid" }, validationRules);
} catch (error) {
    console.log("Validation error:", error.message);
}

console.log("\nError handling examples completed!");