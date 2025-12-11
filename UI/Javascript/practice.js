const data = {
  lineDetails: {
    lineInfo: {
      "newLine1": {
        accessories: [
          { id: 101, name: "AirPods", price: 199 },
          { id: 102, name: "Charger", price: 29 }
        ],
        device: "iPhone 15"
      },
      "newLine2": {
        accessories: [
          { id: 201, name: "Case", price: 49 },
          { id: 202, name: "Screen Guard", price: 19 }
        ],
        device: "Samsung S24"
      },
      "upgradeLine3": {
        accessories: [],
        device: "Pixel 8"
      }
    }
  }
};

for(const line in data.lineDetails.lineInfo) {
  const lineInfo = data.lineDetails.lineInfo[line];
  console.log(`Line: ${line}`);
  console.log(`Device: ${lineInfo.device}`);
}

Object.keys(data.lineDetails.lineInfo).map(line => {
    const lineInfo = data.lineDetails.lineInfo[line];
    console.log(`Line: ${line}`);
    console.log(`Device: ${lineInfo.device}`);
});

// Get ALL accessories from ALL lines using just forEach loop
const accessories = () =>{
    lineInfo = data?.lineDetails?.lineInfo;
    let allAccessories = [];
    Object.keys(lineInfo).forEach(line => {
        let lineAccessories = lineInfo[line]?.accessories || [];
        allAccessories = [...allAccessories, ...lineAccessories]
    });
    return allAccessories;
}

console.log("All Accessories: ", accessories());

// Get ALL accessories from ALL lines using just map

const accessoriesMap = () =>{
    lineInfo = data?.lineDetails?.lineInfo;
    let allAccessories = [];
    Object.keys(lineInfo).map(line => {
        let lineAccessories = lineInfo[line]?.accessories || [];
        allAccessories = [...allAccessories, ...lineAccessories]
    });
    return allAccessories;
}

console.log("All Accessories: ", accessoriesMap());

// Get ALL accessories from ALL lines using just reduce

const accessoriesReduce = () =>{
    lineInfo = data?.lineDetails?.lineInfo;
    let allAccessories = Object.keys(lineInfo).reduce((acc, line) => {
        let lineAccessories = lineInfo[line]?.accessories || [];
        return [...acc, ...lineAccessories]
    },[])
    return allAccessories;
}

console.log("All Accessories: ", accessoriesReduce());


// Get only accessories > ₹100:

const accessoriesAbove100 = () =>{
    let finalResult = [];
    Object.keys(data?.lineDetails?.lineInfo).forEach(line => {
        return line?.accessories.forEach(accessory => {
            if(accessory?.price > 100) {
                finalResult.push(accessory);
            }
        })
    })
    return finalResult;
}

console.log("Accessories above 100: ", accessoriesAbove100());

// Get only accessories > ₹100 using filter

const accessoriesAbove100Filter = () =>{
    let result = [];
    Object.keys(data?.lineDetails?.lineInfo).forEach(line => {
        return data?.lineDetails?.lineInfo[line].accessories.filter(accessory => {
            if(accessory?.price > 100) {
                result.push(accessory);
            }
        })  
    })
    return result;
}

console.log("Accessories above 100 using filter: ", accessoriesAbove100Filter());

// Get only accessories > ₹100 using reduce

const accessoriesAbove100Reduce = () =>{
    let result = Object.keys(data?.lineDetails?.lineInfo).reduce((acc, line) => {
        let filteredAccessories = data?.lineDetails?.lineInfo[line].accessories.filter(accessory => accessory?.price > 100);
        return [...acc, ...filteredAccessories];
    },[]);
    return result;
}
console.log("Accessories above 100 using reduce: ", accessoriesAbove100Reduce());

// ========================================
// COMPARISON: accessoriesAbove100Filter vs accessoriesAbove100Reduce
// ========================================

console.log("\n=== DIFFERENCE ANALYSIS ===\n");

// KEY DIFFERENCES:

console.log("1️⃣ FILTER MISUSE in accessoriesAbove100Filter:");
console.log("   ❌ filter() returns a NEW array but you're ignoring it!");
console.log("   ❌ You're using filter's callback for side effects (push)");
console.log("   ❌ filter() still iterates ALL items even though you only push some");
console.log("   ❌ BAD PRACTICE: Using filter without using its return value\n");

console.log("2️⃣ CORRECT USAGE in accessoriesAbove100Reduce:");
console.log("   ✅ Uses filter's return value properly");
console.log("   ✅ Cleaner, more functional approach");
console.log("   ✅ No side effects, pure functions\n");

// PERFORMANCE COMPARISON:

console.log("3️⃣ PERFORMANCE:");
console.log("   accessoriesAbove100Filter:");
console.log("   - forEach loop: 3 iterations (3 lines)");
console.log("   - filter inside: checks ALL accessories per line");
console.log("   - Total: 2 passes through data (forEach + filter)");
console.log("   - Creates unused filtered arrays (memory waste)\n");

console.log("   accessoriesAbove100Reduce:");
console.log("   - reduce loop: 3 iterations (3 lines)");
console.log("   - filter inside: checks ALL accessories per line");
console.log("   - Total: 2 passes through data (reduce + filter)");
console.log("   - Uses filter's return value (no waste)\n");

console.log("   ⚡ Performance: Both similar speed, but reduce is cleaner\n");

// NO DUPLICATES ISSUE (both produce same result):

console.log("4️⃣ DUPLICATES:");
console.log("   ❌ NO duplicate issue - both produce same result");
console.log("   Both correctly filter accessories > 100 from each line\n");

// BETTER ALTERNATIVES:

console.log("5️⃣ BETTER ALTERNATIVES:\n");

// Option 1: Most efficient - single reduce with direct filtering
const accessoriesAbove100BestReduce = () => {
    return Object.keys(data?.lineDetails?.lineInfo).reduce((acc, line) => {
        const accessories = data?.lineDetails?.lineInfo[line].accessories;
        accessories.forEach(accessory => {
            if (accessory?.price > 100) {
                acc.push(accessory);
            }
        });
        return acc;
    }, []);
}

console.log("✅ BEST (reduce only - single pass):");
console.log(accessoriesAbove100BestReduce());
console.log("   - Single iteration through all data");
console.log("   - No intermediate arrays");
console.log("   - Most efficient\n");

// Option 2: Most readable - flatMap + filter
const accessoriesAbove100BestReadable = () => {
    return Object.values(data?.lineDetails?.lineInfo)
        .flatMap(line => line.accessories)
        .filter(accessory => accessory?.price > 100);
}

console.log("✅ MOST READABLE (flatMap + filter):");
console.log(accessoriesAbove100BestReadable());
console.log("   - Very clear intent");
console.log("   - Functional style");
console.log("   - Slightly slower (creates intermediate array)\n");

// Performance test with larger dataset
console.log("6️⃣ PERFORMANCE TEST:\n");

// Create larger dataset
const largeData = {
    lineDetails: {
        lineInfo: {}
    }
};

for (let i = 0; i < 100; i++) {
    largeData.lineDetails.lineInfo[`line${i}`] = {
        accessories: [
            { id: i * 10 + 1, name: `Item${i}A`, price: Math.random() * 300 },
            { id: i * 10 + 2, name: `Item${i}B`, price: Math.random() * 300 },
            { id: i * 10 + 3, name: `Item${i}C`, price: Math.random() * 300 }
        ],
        device: `Device${i}`
    };
}

// Test 1: Filter approach (misused)
console.time("forEach + filter (misused)");
const result1 = (() => {
    let result = [];
    Object.keys(largeData.lineDetails.lineInfo).forEach(line => {
        largeData.lineDetails.lineInfo[line].accessories.filter(accessory => {
            if (accessory?.price > 100) {
                result.push(accessory);
            }
        });
    });
    return result;
})();
console.timeEnd("forEach + filter (misused)");

// Test 2: Reduce + filter
console.time("reduce + filter");
const result2 = Object.keys(largeData.lineDetails.lineInfo).reduce((acc, line) => {
    let filteredAccessories = largeData.lineDetails.lineInfo[line].accessories.filter(accessory => accessory?.price > 100);
    return [...acc, ...filteredAccessories];
}, []);
console.timeEnd("reduce + filter");

// Test 3: Reduce only (best)
console.time("reduce only (FASTEST)");
const result3 = Object.keys(largeData.lineDetails.lineInfo).reduce((acc, line) => {
    const accessories = largeData.lineDetails.lineInfo[line].accessories;
    accessories.forEach(accessory => {
        if (accessory?.price > 100) {
            acc.push(accessory);
        }
    });
    return acc;
}, []);
console.timeEnd("reduce only (FASTEST)");

// Test 4: flatMap + filter (most readable)
console.time("flatMap + filter (readable)");
const result4 = Object.values(largeData.lineDetails.lineInfo)
    .flatMap(line => line.accessories)
    .filter(accessory => accessory?.price > 100);
console.timeEnd("flatMap + filter (readable)");

console.log("\nAll results equal length:", 
    result1.length === result2.length && 
    result2.length === result3.length && 
    result3.length === result4.length
);

// ========================================
// SUMMARY
// ========================================

console.log("\n=== SUMMARY ===\n");

console.log("┌────────────────────────────┬─────────────┬──────────────┬──────────────┐");
console.log("│ Approach                   │ Performance │ Readability  │ Correctness  │");
console.log("├────────────────────────────┼─────────────┼──────────────┼──────────────┤");
console.log("│ forEach + filter (yours)   │ 😐 Medium   │ 😕 Confusing │ ✅ Works     │");
console.log("│ reduce + filter (yours)    │ 😐 Medium   │ 😊 Good      │ ✅ Works     │");
console.log("│ reduce only                │ ⚡ FASTEST  │ 😊 Good      │ ✅ Works     │");
console.log("│ flatMap + filter           │ 😐 Medium   │ 😍 BEST      │ ✅ Works     │");
console.log("└────────────────────────────┴─────────────┴──────────────┴──────────────┘");

console.log("\n💡 RECOMMENDATION:");
console.log("   For your use case: Use reduce + filter (your second approach)");
console.log("   It's cleaner and properly uses filter's return value.");
console.log("\n   Even better: Use flatMap + filter for maximum readability!");
console.log("   Even better for performance: Use reduce only (single pass)!");

console.log("\n❌ AVOID: Using filter() without using its return value");
console.log("   (like in accessoriesAbove100Filter)");

// ========================================
// MAP vs FLATMAP - DETAILED COMPARISON
// ========================================

console.log("\n\n=== MAP vs FLATMAP ===\n");

// Sample data
const users2 = [
    { name: "Alice", hobbies: ["reading", "gaming"] },
    { name: "Bob", hobbies: ["cooking", "music", "sports"] },
    { name: "Charlie", hobbies: ["coding"] }
];

const numbers2 = [1, 2, 3, 4];

// ========================================
// 1. MAP - Returns array of same length
// ========================================

console.log("1️⃣ MAP - Transforms each element\n");

// Example 1: map returns nested arrays
const hobbiesWithMap = users2.map(user => user.hobbies);
console.log("map result (nested arrays):");
console.log(hobbiesWithMap);
// Output: [["reading", "gaming"], ["cooking", "music", "sports"], ["coding"]]
console.log("Length:", hobbiesWithMap.length); // 3 (same as input)
console.log("Structure: Nested arrays ❌\n");

// Example 2: map with numbers
const doubledArrays = numbers2.map(num => [num * 2]);
console.log("map with numbers (creates nested arrays):");
console.log(doubledArrays);
// Output: [[2], [4], [6], [8]]
console.log("Structure: [[2], [4], [6], [8]] - nested!\n");

// ========================================
// 2. FLATMAP - Flattens result by one level
// ========================================

console.log("2️⃣ FLATMAP - Transforms AND flattens\n");

// Example 1: flatMap automatically flattens
const hobbiesWithFlatMap = users2.flatMap(user => user.hobbies);
console.log("flatMap result (flattened):");
console.log(hobbiesWithFlatMap);
// Output: ["reading", "gaming", "cooking", "music", "sports", "coding"]
console.log("Length:", hobbiesWithFlatMap.length); // 6 (all hobbies)
console.log("Structure: Single flat array ✅\n");

// Example 2: flatMap with numbers
const doubledFlat = numbers2.flatMap(num => [num * 2]);
console.log("flatMap with numbers (flattened):");
console.log(doubledFlat);
// Output: [2, 4, 6, 8]
console.log("Structure: [2, 4, 6, 8] - flat!\n");

// ========================================
// 3. KEY DIFFERENCE VISUALIZATION
// ========================================

console.log("3️⃣ KEY DIFFERENCE:\n");

console.log("map:     [1, 2, 3] → [[a], [b], [c]] → keeps nested structure");
console.log("flatMap: [1, 2, 3] → [[a], [b], [c]] → [a, b, c] (flattens one level)\n");

// ========================================
// 4. PRACTICAL EXAMPLES
// ========================================

console.log("4️⃣ PRACTICAL EXAMPLES:\n");

const orders = [
    { orderId: 1, items: ["apple", "banana"] },
    { orderId: 2, items: ["orange"] },
    { orderId: 3, items: ["grape", "melon", "kiwi"] }
];

// Using map - gives nested arrays
const itemsMap = orders.map(order => order.items);
console.log("All items with map (nested):");
console.log(itemsMap);
// [["apple", "banana"], ["orange"], ["grape", "melon", "kiwi"]]

// Using flatMap - gives flat array
const itemsFlatMap = orders.flatMap(order => order.items);
console.log("\nAll items with flatMap (flat):");
console.log(itemsFlatMap);
// ["apple", "banana", "orange", "grape", "melon", "kiwi"]

// To achieve flatMap result with map, you need manual flattening:
const itemsMapFlattened = orders.map(order => order.items).flat();
console.log("\nAll items with map + flat (same as flatMap):");
console.log(itemsMapFlattened);
console.log("\n💡 flatMap = map + flat (in one step)\n");

// ========================================
// 5. WHEN FLATMAP REALLY SHINES
// ========================================

console.log("5️⃣ WHEN FLATMAP REALLY SHINES:\n");

// Example: Filter and transform at once
const usersWithAge = [
    { name: "Alice", age: 25, pets: ["dog", "cat"] },
    { name: "Bob", age: 17, pets: [] },
    { name: "Charlie", age: 30, pets: ["parrot", "fish", "hamster"] }
];

// Get all pets from users over 18
const adultPets = usersWithAge.flatMap(user => 
    user.age >= 18 ? user.pets : []
);
console.log("Pets of adults (flatMap filters + flattens):");
console.log(adultPets);
// ["dog", "cat", "parrot", "fish", "hamster"] - Bob excluded

// With map, you'd get:
const adultPetsMap = usersWithAge.map(user => 
    user.age >= 18 ? user.pets : []
);
console.log("\nWith map (nested, includes empty array):");
console.log(adultPetsMap);
// [["dog", "cat"], [], ["parrot", "fish", "hamster"]]

console.log("\n✅ flatMap can filter by returning empty arrays!\n");

// ========================================
// 6. MULTIPLE ITEMS PER INPUT
// ========================================

console.log("6️⃣ RETURNING MULTIPLE ITEMS PER INPUT:\n");

// Duplicate each number
const duplicated = numbers2.flatMap(num => [num, num]);
console.log("Duplicate each number with flatMap:");
console.log(duplicated);
// [1, 1, 2, 2, 3, 3, 4, 4]

// With map, you'd get nested:
const duplicatedMap = numbers2.map(num => [num, num]);
console.log("\nWith map (nested pairs):");
console.log(duplicatedMap);
// [[1, 1], [2, 2], [3, 3], [4, 4]]

// Generate range
const ranges = [2, 3, 1].flatMap(n => Array.from({ length: n }, (_, i) => i));
console.log("\nGenerate ranges with flatMap:");
console.log(ranges);
// [0, 1, 0, 1, 2, 0] - flattened ranges

console.log();

// ========================================
// 7. YOUR LINEINFO EXAMPLE
// ========================================

console.log("7️⃣ YOUR LINEINFO DATA EXAMPLE:\n");

// Using map - returns array of arrays
const accessoriesMap2 = Object.values(data.lineDetails.lineInfo)
    .map(line => line.accessories);
console.log("Accessories with map (nested):");
console.log(accessoriesMap2);
console.log("Type: Array of arrays\n");

// Using flatMap - returns flat array
const accessoriesFlatMap2 = Object.values(data.lineDetails.lineInfo)
    .flatMap(line => line.accessories);
console.log("Accessories with flatMap (flat):");
console.log(accessoriesFlatMap2);
console.log("Type: Single flat array\n");

// Filter accessories > 100 with flatMap
const expensiveAccessories = Object.values(data.lineDetails.lineInfo)
    .flatMap(line => line.accessories)
    .filter(acc => acc.price > 100);
console.log("Expensive accessories (flatMap + filter):");
console.log(expensiveAccessories);

console.log();

// ========================================
// 8. COMPARISON TABLE
// ========================================

console.log("8️⃣ COMPARISON TABLE:\n");

console.log("┌──────────────────┬────────────────────────┬────────────────────────┐");
console.log("│ Feature          │ map()                  │ flatMap()              │");
console.log("├──────────────────┼────────────────────────┼────────────────────────┤");
console.log("│ Output Length    │ Same as input          │ Can be different       │");
console.log("│ Nesting          │ Preserves nesting      │ Flattens one level     │");
console.log("│ Return Value     │ Any value              │ Array (will flatten)   │");
console.log("│ Use Case         │ 1-to-1 transform       │ 1-to-many transform    │");
console.log("│ Equivalent       │ map(fn)                │ map(fn).flat()         │");
console.log("│ Filtering        │ Can't filter           │ Return [] to filter    │");
console.log("└──────────────────┴────────────────────────┴────────────────────────┘");

console.log();

// ========================================
// 9. PERFORMANCE COMPARISON
// ========================================

console.log("9️⃣ PERFORMANCE COMPARISON:\n");

const largeUsers = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    tags: [`tag${i}a`, `tag${i}b`, `tag${i}c`]
}));

// Test 1: map + flat
console.time("map + flat (2 passes)");
const result1Perf = largeUsers.map(u => u.tags).flat();
console.timeEnd("map + flat (2 passes)");

// Test 2: flatMap
console.time("flatMap (1 pass)");
const result2Perf = largeUsers.flatMap(u => u.tags);
console.timeEnd("flatMap (1 pass)");

console.log("\n⚡ flatMap is faster (single pass) and more readable!\n");

// ========================================
// 10. SUMMARY & BEST PRACTICES
// ========================================

console.log("🎯 SUMMARY:\n");

console.log("Use map() when:");
console.log("  ✅ You want 1-to-1 transformation");
console.log("  ✅ Input length = Output length");
console.log("  ✅ Example: numbers.map(n => n * 2)\n");

console.log("Use flatMap() when:");
console.log("  ✅ You need to flatten nested arrays");
console.log("  ✅ You want 1-to-many transformation");
console.log("  ✅ You need to filter while mapping (return [])");
console.log("  ✅ Example: users.flatMap(u => u.hobbies)\n");

console.log("💡 Remember:");
console.log("  flatMap = map + flat (but faster and cleaner!)");
console.log("  flatMap only flattens ONE level deep\n");


// Get all line keys that have accessories

const lineKeysWithAccessories = () => {
    
    const lineKeys = Object.keys(data?.lineDetails?.lineInfo).filter(line => {
        return data?.lineDetails?.lineInfo[line]?.accessories?.length > 0
    }).map(line => line);
    return lineKeys;

}

console.log("Line keys with accessories: ", lineKeysWithAccessories());

// Build an array of:
// [
//   { lineKey: "newLine1", accessoryCount: 2 },
//   { lineKey: "newLine2", accessoryCount: 2 },
//   { lineKey: "upgradeLine3", accessoryCount: 0 }
// ]

const accessoryCountsPerLine = () => {
    return Object.keys(data?.lineDetails?.lineInfo).map(line => {
        let count = data?.lineDetails?.lineInfo[line]?.accessories?.length || 0;
        return {lineKey: line, accessoryCount: count}
    })
}

console.log("Accessory counts per line: ", accessoryCountsPerLine());


// Flatten all accessories into a single array of objects with lineKey added
// Example output:

// [
//   { line: "newLine1", id: 101, name: "AirPods", price: 199 },
//   { line: "newLine1", id: 102, name: "Charger", price: 29 },
//   { line: "newLine2", id: 201, name: "Case", price: 49 },
//   { line: "newLine2", id: 202, name: "Screen Guard", price: 19 }
// ]

const flattenedAccessoriesWithLine = () => {
    return Object.keys(data?.lineDetails?.lineInfo).flatMap((line) => {
        // Map each accessory to include the line key
        return data?.lineDetails?.lineInfo[line].accessories.map(accessory => ({
            line: line,
            ...accessory
        }));
    });
}

console.log("Flattened accessories with line: ", flattenedAccessoriesWithLine());



// Solution 2: reduce only (single pass)
const flattenedSolution2 = () => {
    return Object.keys(data?.lineDetails?.lineInfo).reduce((acc, line) => {
        data?.lineDetails?.lineInfo[line].accessories.forEach(accessory => {
            acc.push({ line: line, ...accessory });
        });
        return acc;
    }, []);
}

console.log("Solution 2: reduce only (fastest):");
console.log(flattenedSolution2());

// Solution 4: Object.entries (cleaner syntax)
const flattenedSolution4 = () => {
    return Object.entries(data?.lineDetails?.lineInfo).flatMap(([line, lineData]) => {
        return lineData.accessories.map(accessory => ({
            line: line,
            ...accessory
        }));
    });
}

console.log("\n Solution 4: Object.entries + flatMap (cleanest):");
console.log(flattenedSolution4());

// Get total number of accessories across all lines.
const totalAccessoryCount = () => {
    const res = Object.keys(data?.lineDetails?.lineInfo).flatMap(line =>{
        return data?.lineDetails?.lineInfo[line].accessories;
    })
    return res.length;
}

console.log("Total accessory count: ", totalAccessoryCount());

// solution using reduce
const totalAccessoryCountReduce = () => {
    return Object.keys(data?.lineDetails?.lineInfo).reduce((acc, line) => {
        let lineAccessories = data?.lineDetails?.lineInfo[line].accessories;
        return acc + lineAccessories.length;
    },0);
}

console.log("Total accessory count using reduce: ", totalAccessoryCountReduce());

// solution 3
const totalAccessoryCountEntries = () =>
  Object.values(data?.lineDetails?.lineInfo || {})
    .flatMap(line => line.accessories)
    .length;

// Return a new object where keys are line names and values are accessory names only:
// {
//   newLine1: ["AirPods", "Charger"],
//   newLine2: ["Case", "Screen Guard"],
//   upgradeLine3: []
// }

const accessoryNamesByLine = () => {
    return Object.keys(data?.lineDetails?.lineInfo).reduce((acc, line) => {
        let accessoryNames = data?.lineDetails?.lineInfo[line].accessories.map(acc => acc.name);
        acc[line] = accessoryNames;
        return acc;
    }   ,{});
}

console.log("Accessory names by line: ", accessoryNamesByLine());

// solution using entries
const accessoryNamesByLineEntries = () =>
  Object.entries(data?.lineDetails?.lineInfo || {}).reduce(
    (acc, [lineKey, lineData]) => {
      acc[lineKey] = lineData?.accessories?.map(a => a.name) || [];
      return acc;
    },
    {}
  );



