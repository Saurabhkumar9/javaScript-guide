// ES6 Modules Example
// Note: This file structure works with type="module" in HTML or Node.js with .mjs extension

// Exporting individual declarations
export const PI = 3.14159;

export function calculateArea(radius) {
    return PI * radius * radius;
}

export function calculateCircumference(radius) {
    return 2 * PI * radius;
}

// Exporting a class
export class Rectangle {
    constructor(width, height) {
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

// Exporting an object
export const config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retryAttempts: 3
};

// Default export (only one per module)
export default class Calculator {
    static add(a, b) {
        return a + b;
    }
    
    static subtract(a, b) {
        return a - b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
    
    static divide(a, b) {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
    }
}

// Re-exporting from another module
// export { default as MathUtils } from './utils/math.js';

// Named exports with aliases
const secretKey = "supersecret";
export { secretKey as apiKey };

// Aggregating exports
export * as Geometry from './geometry/index.js';

// Dynamic Imports (async)
export async function loadModule(modulePath) {
    try {
        const module = await import(modulePath);
        console.log(`Module ${modulePath} loaded successfully`);
        return module;
    } catch (error) {
        console.error(`Failed to load module ${modulePath}:`, error);
        throw error;
    }
}

// CommonJS Style Exports (for Node.js compatibility)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PI,
        calculateArea,
        calculateCircumference,
        Rectangle,
        config,
        Calculator: Calculator,
        loadModule
    };
}

// ================================================
// Example usage in another file would look like:
/*
// Importing named exports
import { PI, calculateArea, Rectangle } from './modules.js';

// Importing default export
import Calculator from './modules.js';

// Importing everything
import * as MathModule from './modules.js';

// Importing with aliases
import { PI as π, calculateArea as area } from './modules.js';

// Dynamic import
const module = await import('./modules.js');
*/