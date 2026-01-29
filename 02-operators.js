// Arithmetic Operators
let x = 10;
let y = 5;

console.log("Arithmetic Operators:");
console.log("Addition:", x + y); // 15
console.log("Subtraction:", x - y); // 5
console.log("Multiplication:", x * y); // 50
console.log("Division:", x / y); // 2
console.log("Modulus:", x % y); // 0
console.log("Exponentiation:", x ** y); // 100000
console.log("Increment:", x++); // 10 (post-increment)
console.log("After increment:", x); // 11
console.log("Decrement:", y--); // 5 (post-decrement)
console.log("After decrement:", y); // 4

// Comparison Operators
console.log("\nComparison Operators:");
console.log("Equal (==):", 5 == 5); // true
console.log("Equal (==) with coercion:", 5 == "5"); // true (type coercion)
console.log("Strict Equal (===):", 5 === "5"); // false (no coercion)
console.log("Not Equal (!=):", 5 != 3); // true
console.log("Strict Not Equal (!==):", 5 !== "5"); // true
console.log("Greater Than (>):", 10 > 5); // true
console.log("Less Than (<):", 10 < 5); // false
console.log("Greater Than or Equal (>=):", 10 >= 10); // true
console.log("Less Than or Equal (<=):", 5 <= 10); // true

// Logical Operators
let a = true;
let b = false;

console.log("\nLogical Operators:");
console.log("AND (&&):", a && b); // false
console.log("OR (||):", a || b); // true
console.log("NOT (!):", !a); // false

// Short-circuit Evaluation
console.log("\nShort-circuit Evaluation:");
console.log("false && anything:", false && console.log("This won't run"));
console.log("true || anything:", true || console.log("This won't run"));

// Assignment Operators
let num = 10;
num += 5; // num = num + 5
console.log("\nAssignment Operators:");
console.log("+= :", num); // 15
num -= 3; // num = num - 3
console.log("-= :", num); // 12
num *= 2; // num = num * 2
console.log("*= :", num); // 24
num /= 4; // num = num / 4
console.log("/= :", num); // 6
num %= 4; // num = num % 4
console.log("%= :", num); // 2
num **= 3; // num = num ** 3
console.log("**= :", num); // 8

// Ternary Operator
let age = 18;
let status = age >= 18 ? "Adult" : "Minor";
console.log("\nTernary Operator:");
console.log("Status:", status); // Adult

// Nullish Coalescing Operator (??)
let value = null;
let defaultValue = value ?? "default";
console.log("\nNullish Coalescing:");
console.log("Result:", defaultValue); // default

let zeroValue = 0;
let result = zeroValue ?? "default";
console.log("Zero value result:", result); // 0 (not "default")

// Optional Chaining Operator (?.)
let user = {
    profile: {
        name: "John",
        address: {
            city: "New York"
        }
    }
};

console.log("\nOptional Chaining:");
console.log("City:", user?.profile?.address?.city); // New York
console.log("Non-existent property:", user?.profile?.age?.years); // undefined

// Bitwise Operators
console.log("\nBitwise Operators:");
console.log("5 & 1 (AND):", 5 & 1); // 1
console.log("5 | 1 (OR):", 5 | 1); // 5
console.log("~5 (NOT):", ~5); // -6
console.log("5 ^ 1 (XOR):", 5 ^ 1); // 4
console.log("5 << 1 (Left Shift):", 5 << 1); // 10
console.log("5 >> 1 (Right Shift):", 5 >> 1); // 2

// typeof Operator
console.log("\ntypeof Operator:");
console.log("typeof string:", typeof "hello");
console.log("typeof number:", typeof 123);
console.log("typeof boolean:", typeof true);
console.log("typeof object:", typeof {});
console.log("typeof function:", typeof function() {});
console.log("typeof undefined:", typeof undefined);
console.log("typeof symbol:", typeof Symbol());

// instanceof Operator
console.log("\ninstanceof Operator:");
console.log("[] instanceof Array:", [] instanceof Array); // true
console.log("{} instanceof Object:", {} instanceof Object); // true
console.log("[] instanceof Object:", [] instanceof Object); // true
console.log("new Date() instanceof Date:", new Date() instanceof Date); // true

// Spread Operator (...)
console.log("\nSpread Operator:");
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combined = [...arr1, ...arr2];
console.log("Combined array:", combined);

let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3, d: 4 };
let mergedObj = { ...obj1, ...obj2 };
console.log("Merged object:", mergedObj);

// Rest Operator
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log("\nRest Operator:");
console.log("Sum of 1,2,3,4,5:", sum(1, 2, 3, 4, 5));

// Comma Operator
console.log("\nComma Operator:");
let x1 = (1, 2, 3); // Returns last value
console.log("Comma operator result:", x1); // 3