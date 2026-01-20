// lets walk through a simple example of using Promises in JavaScript

// A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

// First, lets understand about callbacks

// callbacks are functions passed as arguments to other functions to be executed later
function fetchData(callback) {
    setTimeout(() => {
        callback("Data received");
    }, 1000);
}

// Using the callback function
fetchData((data) => {
    console.log(data); // Output: Data received
});

// However, callbacks can lead to "callback hell" when dealing with multiple asynchronous operations

function fetchData1(callback) {
    setTimeout(() => {
        callback("Data 1 received");
    }, 1000); 
}

function fetchData2(callback) {
    setTimeout(() => {
        callback("Data 2 received");
    }, 1000);
}

function fetchData3(callback) {
    setTimeout(()=> {
        callback("Data 3 received");
    }, 1000);
}

function fetchData4(callback){
    setTimeout(() => {
        callback("Data 4 received");
    }, 1000);
}

function fetchData5(callback){
    setTimeout(() => {
        callback("Data 5 received");
    }, 1000);
}

// Nested callbacks leading to callback hell
fetchData1((data1) => {
    console.log(data1); // Output: Data 1 received
    fetchData2((data2) => {
        console.log(data2);
         // Output: Data 2 received
        fetchData3((data3) => {
            console.log(data3); 
            // Output: Data 3 received
            fetchData4((data4) => {
                console.log(data4);     
                // Output: Data 4 received
                fetchData5((data5) => {
                    console.log(data5); 
                    // Output: Data 5 received
                });         
            });
        });
    }); 
});

// To avoid callback hell, we can use Promises
// Promise states:
// 1. Pending - Still working on it
// 2. Fulfilled (Resolved) - Success! Here's the value
// 3. Rejected - Failed, here's the errors

// Converting callback-based functions to Promise-based functions
function fetchDataPromise1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data 1 received");
        }, 1000);
    });
}

function fetchDataPromise2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data 2 received");
        }, 1000);
    });
}

function fetchDataPromise3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data 3 received");
        }, 1000);
    });
}

function fetchDataPromise4() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data 4 received");
        }, 1000);
    });
}

function fetchDataPromise5() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data 5 received");
        }, 1000);
    });
}

// Solution 1: Using Promise chaining with .then()
fetchDataPromise1()
    .then((data1) => {
        console.log(data1); // Output: Data 1 received
        return fetchDataPromise2();
    })
    .then((data2) => {
        console.log(data2); // Output: Data 2 received
        return fetchDataPromise3();
    })
    .then((data3) => {
        console.log(data3); // Output: Data 3 received
        return fetchDataPromise4();
    })
    .then((data4) => {
        console.log(data4); // Output: Data 4 received
        return fetchDataPromise5();
    })
    .then((data5) => {
        console.log(data5); // Output: Data 5 received
    })
    .catch((error) => {
        console.error("Error:", error);
    });

// Solution 2: Using async/await (cleaner and more readable)
async function fetchAllData() {
    try {
        const data1 = await fetchDataPromise1();
        console.log(data1); // Output: Data 1 received
        
        const data2 = await fetchDataPromise2();
        console.log(data2); // Output: Data 2 received
        
        const data3 = await fetchDataPromise3();
        console.log(data3); // Output: Data 3 received
        
        const data4 = await fetchDataPromise4();
        console.log(data4); // Output: Data 4 received
        
        const data5 = await fetchDataPromise5();
        console.log(data5); // Output: Data 5 received
    } catch (error) {
        console.error("Error:", error);
    }
}

// Call the async function
fetchAllData();



// This shows how Promises work under the hood
class MyPromise {
    constructor(executor) {
        // Promise can be in one of these states
        this.state = 'PENDING';  // 'PENDING', 'FULFILLED', or 'REJECTED'
        this.value = undefined;   // The resolved value or rejection reason
        this.handlers = [];       // Queue of .then() and .catch() handlers
        
        // The resolve function that will be passed to executor
        const resolve = (result) => {
            if (this.state !== 'PENDING') return; // Can only resolve once
            
            this.state = 'FULFILLED';
            this.value = result;
            this.handlers.forEach(handler => handler.onFulfilled(result));
        };
        
        // The reject function that will be passed to executor
        const reject = (error) => {
            if (this.state !== 'PENDING') return; // Can only reject once
            
            this.state = 'REJECTED';
            this.value = error;
            this.handlers.forEach(handler => handler.onRejected(error));
        };
        
        // Execute the executor function immediately
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    
    // The .then() method for chaining
    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const handle = () => {
                if (this.state === 'FULFILLED') {
                    try {
                        const result = onFulfilled ? onFulfilled(this.value) : this.value;
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                } else if (this.state === 'REJECTED') {
                    if (onRejected) {
                        try {
                            const result = onRejected(this.value);
                            resolve(result);
                        } catch (error) {
                            reject(error);
                        }
                    } else {
                        reject(this.value);
                    }
                }
            };
            
            if (this.state === 'PENDING') {
                // If still pending, queue the handler
                this.handlers.push({
                    onFulfilled: (value) => {
                        try {
                            const result = onFulfilled ? onFulfilled(value) : value;
                            resolve(result);
                        } catch (error) {
                            reject(error);
                        }
                    },
                    onRejected: (error) => {
                        if (onRejected) {
                            try {
                                const result = onRejected(error);
                                resolve(result);
                            } catch (error) {
                                reject(error);
                            }
                        } else {
                            reject(error);
                        }
                    }
                });
            } else {
                // If already settled, execute immediately
                handle();
            }
        });
    }
    
    // The .catch() method is just syntactic sugar for .then(null, onRejected)
    catch(onRejected) {
        return this.then(null, onRejected);
    }
}

// Example using our custom MyPromise
const myPromiseExample = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("Custom Promise resolved!");
    }, 1000);
});

myPromiseExample
    .then((data) => {
        console.log(data); // Output: Custom Promise resolved!
        return "Chained value";
    })
    .then((data) => {
        console.log(data); // Output: Chained value
    })
    .catch((error) => {
        console.error("Error:", error);
    });

// ========================================
// IMPORTANT: Classes are Syntactic Sugar!
// ========================================
// The MyPromise class above is actually converted to this function-based code by JS engine:

function MyPromiseFunction(executor) {
    // Properties (same as constructor)
    this.state = 'PENDING';
    this.value = undefined;
    this.handlers = [];
    
    // Create resolve and reject functions
    const self = this; // Keep reference to 'this'
    
    const resolve = (result) => {
        if (self.state !== 'PENDING') return;
        self.state = 'FULFILLED';
        self.value = result;
        self.handlers.forEach(handler => handler.onFulfilled(result));
    };
    
    const reject = (error) => {
        if (self.state !== 'PENDING') return;
        self.state = 'REJECTED';
        self.value = error;
        self.handlers.forEach(handler => handler.onRejected(error));
    };
    
    // Execute the executor
    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

// Methods are added to the prototype (not inside the constructor)
MyPromiseFunction.prototype.then = function(onFulfilled, onRejected) {
    const self = this;
    return new MyPromiseFunction((resolve, reject) => {
        const handle = () => {
            if (self.state === 'FULFILLED') {
                try {
                    const result = onFulfilled ? onFulfilled(self.value) : self.value;
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            } else if (self.state === 'REJECTED') {
                if (onRejected) {
                    try {
                        const result = onRejected(self.value);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject(self.value);
                }
            }
        };
        
        if (self.state === 'PENDING') {
            self.handlers.push({
                onFulfilled: (value) => {
                    try {
                        const result = onFulfilled ? onFulfilled(value) : value;
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                },
                onRejected: (error) => {
                    if (onRejected) {
                        try {
                            const result = onRejected(error);
                            resolve(result);
                        } catch (error) {
                            reject(error);
                        }
                    } else {
                        reject(error);
                    }
                }
            });
        } else {
            handle();
        }
    });
};

MyPromiseFunction.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
};

// Both work exactly the same way:
const example1 = new MyPromise(() => {}); // Using class
const example2 = new MyPromiseFunction(() => {}); // Using function

// Key differences in syntax:
// CLASS:      class MyPromise { constructor() {...} method() {...} }
// FUNCTION:   function MyPromise() {...}
//             MyPromise.prototype.method = function() {...}

// ========================================
// Complete Example with Function-based Promise
// ========================================

const functionPromiseExample = new MyPromiseFunction((resolve, reject) => {
    setTimeout(() => {
        resolve("Function-based Promise resolved!");
    }, 1500);
});

functionPromiseExample
    .then((data) => {
        console.log(data); // Output: Function-based Promise resolved!
        return "Value from function promise";
    })
    .then((data) => {
        console.log(data); // Output: Value from function promise
    })
    .catch((error) => {
        console.error("Error:", error);
    });

// You can even chain class-based and function-based promises:
const mixedExample = new MyPromise((resolve, reject) => {
    resolve("From class");
})
.then((data) => {
    console.log(data); // Output: From class
    return new MyPromiseFunction((resolve, reject) => {
        resolve("From function");
    });
})
.then((data) => {
    console.log(data); // Output: From function (if both implementations are compatible)
});

// ========================================
// Simple Promise Sample Function
// ========================================

// PROBLEM: This returns a timer ID, not the time!
function getCurrentTimeWrong(){
    return setTimeout(() => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        return `${hours}:${minutes}:${seconds}`; // This return doesn't work!
    }, 1000);
}

var currentTime = getCurrentTimeWrong();
console.log("Current Time is: ", currentTime); // Output: a number (timer ID), not time!

// SOLUTION 1: Using Callback
function getCurrentTimeCallback(callback) {
    setTimeout(() => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        callback(`${hours}:${minutes}:${seconds}`);
    }, 1000);
}

getCurrentTimeCallback((time) => {
    console.log("Current Time (callback):", time); // Output: 14:30:45 (or current time)
});

// SOLUTION 2: Using Promise (BEST)
function getCurrentTimePromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            resolve(`${hours}:${minutes}:${seconds}`);
        }, 1000);
    });
}

getCurrentTimePromise()
    .then((time) => {
        console.log("Current Time (promise):", time); // Output: 14:30:45 (or current time)
    })
    .catch((error) => {
        console.error("Error getting time:", error);
    });

// ========================================
// STEP-BY-STEP: What happens when getCurrentTimePromise() executes
// ========================================

console.log("STEP 1: Calling getCurrentTimePromise()");
const promiseObject = getCurrentTimePromise();
console.log("STEP 2: Function returned:", promiseObject);
// Output: Promise { <pending> }
// It returns a Promise OBJECT, not the time value!

console.log("STEP 3: Promise state at this moment:");
console.log("  - state: PENDING");
console.log("  - value: undefined (no value yet)");
console.log("  - The setTimeout is scheduled but hasn't executed yet");

console.log("\nSTEP 4: Attaching .then() handler");
promiseObject.then((time) => {
    console.log("\nSTEP 6: Inside .then() callback (executed after 1 second)");
    console.log("  - Promise state: FULFILLED");
    console.log("  - Promise value:", time);
    console.log("  - Actual time:", time); // e.g., "14:30:45"
});

console.log("STEP 5: Code continues immediately (doesn't wait for Promise)");
console.log("Main execution finished, waiting for setTimeout...\n");

// Timeline visualization:
console.log("\n========================================");
console.log("TIMELINE:");
console.log("========================================");
console.log("0ms:    getCurrentTimePromise() called");
console.log("0ms:    Returns Promise { <pending> }");
console.log("0ms:    setTimeout scheduled for 1000ms");
console.log("0ms:    .then() callback registered");
console.log("0ms:    Main code continues (non-blocking)");
console.log("...     (JavaScript event loop keeps running)");
console.log("1000ms: setTimeout callback executes");
console.log("1000ms: resolve() is called with time string");
console.log("1000ms: Promise state changes to FULFILLED");
console.log("1000ms: .then() callback executes with the time");
console.log("========================================\n");

// What the Promise object looks like internally:
console.log("========================================");
console.log("PROMISE OBJECT STRUCTURE:");
console.log("========================================");
console.log(`
At 0ms (immediately after getCurrentTimePromise()):
{
    [[PromiseState]]: "pending",
    [[PromiseResult]]: undefined,
    [[PromiseFulfillReactions]]: [callback function from .then()]
}

At 1000ms (after setTimeout executes):
{
    [[PromiseState]]: "fulfilled",
    [[PromiseResult]]: "14:30:45",  // The actual time
    [[PromiseFulfillReactions]]: []  // Empty, already executed
}
`);
console.log("========================================\n");

// SOLUTION 3: Using async/await (CLEANEST)
async function displayCurrentTime() {
    const time = await getCurrentTimePromise();
    console.log("Current Time (async/await):", time); // Output: 14:30:45 (or current time)
}

displayCurrentTime();

function myPromiseSample(callback){

    this.state = 'PENDING';
    this.value = undefined;
    this.callbacks = [];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            callback("Sample Promise resolved!");
        }, 1000);
    });

}

// Goal : Create a resuable function which calls an api with a retry limit if failed

// Version 1: Without parameters
function callProfileApi(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            const success = Math.random() > 0.7;
            if(success)
                resolve("Profile data received")
            reject("API Failed");
        }, 1000)
    })
}

function retry(fn, maxAttempts){
    let count = 0;
    function execute(){
        count++;
        return fn().catch((err) => {
            if(count > maxAttempts)
                throw err;
            console.log('Retrying...', count);
            return execute();
        })
    }
    return execute();
}

retry(callProfileApi, 3)
.then((data)=> console.log(data))
.catch((err)=> {console.error(err)})

// Version 2: With parameters
function callProfileApiWithParams(userId, token){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            const success = Math.random() > 0.7;
            if(success)
                resolve(`Profile data for user ${userId} received with token ${token}`)
            reject(`API Failed for user ${userId}`);
        }, 1000)
    })
}

// Solution 1: Using rest parameters and spread operator
function retryWithParams(fn, maxAttempts, ...args){
    let count = 0;
    function execute(){
        count++;
        return fn(...args).catch((err) => {
            if(count >= maxAttempts)
                throw err;
            console.log('Retrying...', count);
            return execute();
        })
    }
    return execute();
}

// Usage: Pass the function and its arguments
retryWithParams(callProfileApiWithParams, 3, '12345', 'abc-token')
.then((data)=> console.log(data))
.catch((err)=> {console.error(err)})

// Solution 2: Using a wrapper function (more flexible)
function retryWithWrapper(fn, maxAttempts){
    let count = 0;
    function execute(){
        count++;
        return fn().catch((err) => {
            if(count >= maxAttempts)
                throw err;
            console.log('Retrying...', count);
            return execute();
        })
    }
    return execute();
}

// Usage: Wrap the API call with its parameters
retryWithWrapper(() => callProfileApiWithParams('67890', 'xyz-token'), 3)
.then((data)=> console.log(data))
.catch((err)=> {console.error(err)})

// Solution 3: More generic retry with options
function retryAdvanced(promiseFn, options = {}){
    const { 
        maxAttempts = 3, 
        delay = 0, 
        onRetry = null 
    } = options;
    
    let count = 0;
    
    function execute(){
        count++;
        return promiseFn().catch((err) => {
            if(count >= maxAttempts){
                throw new Error(`Failed after ${maxAttempts} attempts: ${err}`);
            }
            
            if(onRetry) onRetry(count, err);
            
            console.log(`Retry attempt ${count}/${maxAttempts}`);
            
            // Optional delay between retries
            if(delay > 0){
                return new Promise(resolve => setTimeout(resolve, delay))
                    .then(() => execute());
            }
            
            return execute();
        })
    }
    return execute();
}

// Usage with options
retryAdvanced(
    () => callProfileApiWithParams('99999', 'premium-token'), 
    { 
        maxAttempts: 5, 
        delay: 500,
        onRetry: (attempt, error) => {
            console.log(`Custom retry handler: Attempt ${attempt}, Error: ${error}`)
        }
    }
)
.then((data)=> console.log('Success:', data))
.catch((err)=> {console.error('Final error:', err)})

