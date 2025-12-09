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
fetchData(() => {
    console.log(); // Output: Data received
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


