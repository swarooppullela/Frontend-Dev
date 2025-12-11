// ========================================
// ARRAY METHODS COMPARISON: reduce vs map vs forEach
// ========================================

// Sample data for testing
const numbers = [1, 2, 3, 4, 5];
const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 35 }
];

// ========================================
// 1. forEach - For side effects (no return value)
// ========================================

console.log("=== forEach ===");

// forEach always returns undefined
const forEachResult = numbers.forEach((num) => {
    console.log(num * 2);
});

console.log("forEach return value:", forEachResult); // undefined

// Common use: Modifying external state
let sum1 = 0;
numbers.forEach((num) => {
    sum1 += num;
});
console.log("Sum using forEach:", sum1);

// ========================================
// 2. map - For transforming arrays (returns new array)
// ========================================

console.log("\n=== map ===");

// map returns a NEW array with transformed values
const doubled = numbers.map((num) => num * 2);
console.log("Doubled:", doubled); // [2, 4, 6, 8, 10]

// Extract property from objects
const names = users.map((user) => user.name);
console.log("Names:", names); // ["Alice", "Bob", "Charlie"]

// map ALWAYS returns an array of the same length
const mapResult = numbers.map((num) => {
    if (num > 3) return num;
    // Even if you don't return, it returns undefined
});
console.log("Map with conditional:", mapResult); // [undefined, undefined, undefined, 4, 5]

// ========================================
// 3. reduce - For accumulating/reducing to a single value
// ========================================

console.log("\n=== reduce ===");

// Summing numbers
const sum2 = numbers.reduce((accumulator, current) => {
    return accumulator + current;
}, 0); // 0 is the initial value
console.log("Sum using reduce:", sum2); // 15

// Can return ANY type (number, string, object, array, etc.)
const product = numbers.reduce((acc, num) => acc * num, 1);
console.log("Product:", product); // 120

// Creating an object
const userById = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
}, {});
console.log("Users by ID:", userById);

// Flattening an array
const nested = [[1, 2], [3, 4], [5]];
const flattened = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log("Flattened:", flattened); // [1, 2, 3, 4, 5]

// ========================================
// SAME TASK WITH ALL THREE METHODS
// Task: Double all numbers and sum them
// ========================================

console.log("\n=== Same Task with All Three ===");

// Using forEach
let sumForEach = 0;
numbers.forEach((num) => {
    sumForEach += num * 2;
});
console.log("forEach result:", sumForEach); // 30

// Using map + reduce (two operations)
const sumMap = numbers
    .map((num) => num * 2)
    .reduce((acc, num) => acc + num, 0);
console.log("map + reduce result:", sumMap); // 30

// Using reduce only (one operation)
const sumReduce = numbers.reduce((acc, num) => acc + (num * 2), 0);
console.log("reduce only result:", sumReduce); // 30

// ========================================
// PERFORMANCE COMPARISON
// ========================================

console.log("\n=== Performance Test ===");

// Large array for testing
const largeArray = Array.from({ length: 1000000 }, (_, i) => i + 1);

// Test 1: forEach
console.time("forEach");
let total1 = 0;
largeArray.forEach((num) => {
    total1 += num * 2;
});
console.timeEnd("forEach");

// Test 2: map + reduce (creates intermediate array)
console.time("map + reduce");
const total2 = largeArray
    .map((num) => num * 2)
    .reduce((acc, num) => acc + num, 0);
console.timeEnd("map + reduce");

// Test 3: reduce only
console.time("reduce only");
const total3 = largeArray.reduce((acc, num) => acc + (num * 2), 0);
console.timeEnd("reduce only");

// Test 4: for loop (traditional - fastest)
console.time("for loop");
let total4 = 0;
for (let i = 0; i < largeArray.length; i++) {
    total4 += largeArray[i] * 2;
}
console.timeEnd("for loop");

console.log("\nAll results equal:", total1 === total2 && total2 === total3 && total3 === total4);

// ========================================
// KEY DIFFERENCES SUMMARY
// ========================================

console.log("\n=== KEY DIFFERENCES ===");

console.log(`
┌─────────────┬──────────────────┬─────────────────┬─────────────────┐
│   Method    │   Return Value   │   Use Case      │   Performance   │
├─────────────┼──────────────────┼─────────────────┼─────────────────┤
│  forEach    │   undefined      │   Side effects  │   Fast          │
│             │                  │   (logging,     │                 │
│             │                  │   mutations)    │                 │
├─────────────┼──────────────────┼─────────────────┼─────────────────┤
│    map      │   New array      │   Transform     │   Medium        │
│             │   (same length)  │   each element  │   (creates new  │
│             │                  │                 │   array)        │
├─────────────┼──────────────────┼─────────────────┼─────────────────┤
│   reduce    │   Any single     │   Accumulate    │   Fast          │
│             │   value          │   to single     │   (flexible)    │
│             │                  │   result        │                 │
└─────────────┴──────────────────┴─────────────────┴─────────────────┘
`);

// ========================================
// WHEN TO USE EACH
// ========================================

console.log("\n=== WHEN TO USE ===");

// Use forEach when:
console.log("✅ Use forEach when:");
console.log("  - You need side effects (console.log, DOM manipulation)");
console.log("  - You're modifying external variables");
console.log("  - You don't need a return value");
console.log("  - Example: numbers.forEach(n => console.log(n))");

console.log("\n✅ Use map when:");
console.log("  - You need to transform every element");
console.log("  - You want a new array of the same length");
console.log("  - You're chaining with other array methods");
console.log("  - Example: numbers.map(n => n * 2)");

console.log("\n✅ Use reduce when:");
console.log("  - You need to accumulate to a single value");
console.log("  - You're calculating sum, product, etc.");
console.log("  - You're building a different data structure");
console.log("  - You want maximum flexibility");
console.log("  - Example: numbers.reduce((sum, n) => sum + n, 0)");

// ========================================
// COMMON MISTAKES
// ========================================

console.log("\n=== COMMON MISTAKES ===");

// ❌ Mistake 1: Using map when you don't need the result
console.log("\n❌ BAD - map without using result:");
numbers.map((num) => console.log(num)); // Creates unused array!

console.log("\n✅ GOOD - forEach for side effects:");
numbers.forEach((num) => console.log(num)); // No unused array

// ❌ Mistake 2: Mutating original array in map
console.log("\n❌ BAD - mutating in map:");
const original = [{ x: 1 }, { x: 2 }];
const bad = original.map((obj) => {
    obj.x = obj.x * 2; // Mutates original!
    return obj;
});
console.log("Original mutated:", original); // Changed!

console.log("\n✅ GOOD - create new objects:");
const original2 = [{ x: 1 }, { x: 2 }];
const good = original2.map((obj) => ({ x: obj.x * 2 })); // New objects
console.log("Original preserved:", original2); // Unchanged

// ❌ Mistake 3: Forgetting initial value in reduce
console.log("\n❌ DANGEROUS - no initial value:");
try {
    const empty = [];
    const result = empty.reduce((acc, val) => acc + val);
    // Throws error on empty array!
} catch (e) {
    console.log("Error:", e.message);
}

console.log("\n✅ SAFE - with initial value:");
const empty = [];
const result = empty.reduce((acc, val) => acc + val, 0); // Safe!
console.log("Result:", result); // 0

// ========================================
// PERFORMANCE RANKING (General)
// ========================================

console.log("\n=== PERFORMANCE RANKING ===");
console.log("Fastest to Slowest (for most operations):");
console.log("1. for loop (traditional) - Fastest");
console.log("2. forEach - Very fast, no new array");
console.log("3. reduce - Fast, flexible");
console.log("4. map - Creates new array (memory overhead)");
console.log("5. map + reduce chained - Slowest (multiple iterations + intermediate array)");

console.log("\n⚠️ IMPORTANT:");
console.log("- For small arrays (<1000 items), performance difference is negligible");
console.log("- Readability > Micro-optimization");
console.log("- Use the method that makes your intent clearest");

// ========================================
// REAL-WORLD EXAMPLES
// ========================================

console.log("\n=== REAL-WORLD EXAMPLES ===");

const products = [
    { id: 1, name: "Laptop", price: 1000, quantity: 2 },
    { id: 2, name: "Mouse", price: 25, quantity: 5 },
    { id: 3, name: "Keyboard", price: 75, quantity: 3 }
];

// Example 1: Calculate total cart value (reduce)
const totalCartValue = products.reduce((total, product) => {
    return total + (product.price * product.quantity);
}, 0);
console.log("\nTotal cart value (reduce):", totalCartValue); // 2250

// Example 2: Get product names (map)
const productNames = products.map(product => product.name);
console.log("Product names (map):", productNames);

// Example 3: Log each product (forEach)
console.log("\nProduct list (forEach):");
products.forEach(product => {
    console.log(`- ${product.name}: $${product.price}`);
});

// Example 4: Group by price range (reduce)
const priceGroups = products.reduce((groups, product) => {
    const key = product.price < 50 ? 'cheap' : 'expensive';
    if (!groups[key]) groups[key] = [];
    groups[key].push(product);
    return groups;
}, {});
console.log("\nPrice groups (reduce):", priceGroups);

// ========================================
// CHAINING COMPARISON
// ========================================

console.log("\n=== CHAINING COMPARISON ===");

// Scenario: Get names of expensive products (price > 50)

// Using map + filter (readable but creates intermediate arrays)
const expensiveNames1 = products
    .filter(p => p.price > 50)
    .map(p => p.name);
console.log("map + filter:", expensiveNames1);

// Using reduce (one pass, but less readable)
const expensiveNames2 = products.reduce((names, product) => {
    if (product.price > 50) {
        names.push(product.name);
    }
    return names;
}, []);
console.log("reduce only:", expensiveNames2);

console.log("\n💡 Best practice: Favor readability unless performance is critical!");
