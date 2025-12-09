// implement your own new 
function myNew(constructor, ...args) {
  // Step 1: Create empty object
  const obj = {};

  // Step 2: Set its prototype
  obj.__proto__ = constructor.prototype; 
  // OR: Object.setPrototypeOf(obj, constructor.prototype)

  // Step 3: Call the constructor with obj as this
  const result = constructor.apply(obj, args);

  // Step 4: If constructor returns an object, use it. Otherwise return obj
  return typeof result === "object" && result !== null ? result : obj;
}
// Example usage:
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const john = myNew(Person, "John", 30);
console.log(john.name); // Output: John
console.log(john.age);  // Output: 30


// Polyfill for bind

