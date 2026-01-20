function callApi1(callback){
    return setTimeout(()=>{
        callback("Data from api 1");
    }, 1000)
}

function callApi2(callback){
    return setTimeout(()=>{
        callback("Data from api 2");
    },1000)
}

function callApi3(callback){
    return setTimeout(()=>{
        callback("Data from api 3");
    }, 1000);
}

// call 3 apis sequential using callback

callApi1((data)=>{
    console.log(data);
    callApi2((data)=>{
        console.log(data)
        callApi3((data)=>{
            console.log(data);
        })
    })
});

// call 3 apis parallel
callApi1();
callApi2();
callApi3();

// using promise

function callApi1Promise(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("Data from api 1");
        }, 1000)
    })
}

function callApi2Promise(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("Data from api 2");
        }, 1000)
    })
}

function callApi3Promise(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("Data from api 3");
        }, 1000)
    });
}

// using promise

callApi1Promise()
    .then((data)=>{
        console.log(data);
        return callApi2Promise();
    })
    .then((data)=>{
        console.log(data);
        return callApi3Promise();
    })
    .then((data)=>{
        console.log(data);
    })
    .catch((err)=>{
        console.error("Api Error", err);
    })

// using Async/Await

async function callApis() {
    try {
        const data1 = await callApi1Promise();
        console.log(data1);
        const data2 = await callApi2Promise();
        console.log(data2);
        const data3 = await callApi3Promise();
        console.log(data3);
    } catch (err) {
        console.log(err);
    }
}

callApis();

// promise all, allSettled, race, any

// so if we want to call apis in parallel then use these promise all, allSettled, race, any
Promise.all([callApi1Promise(), callApi2Promise(), callApi3Promise()])
        .then((data)=>{
            console.log("Parallel API calls result:", data);
        })
        .catch((err)=>{
            console.error("One or more APIs failed:", err);
        })



// Polyfill for promise.all, promise.allSetteled, promise.any

Promise.prototype.myAll = function (iterable) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(iterable))
            throw new Error("Input must be iterable");

        const total = iterable.length;
        let completed = 0;
        let result = [];
        if (total === 0) {
            resolve([]);
            return;
        }
        iterable.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((data) => {
                    result[index] = data;
                    completed++;
                    if (completed === total) {
                        resolve(result);
                    }
                    console.log(data);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    });

}


Promise.prototype.myAllSetteled = function (iterable) {
    return new Promise((resolve, reject) => {
        if(!Array.isArray(iterable))
            throw new Error("Input must be iterable");
        if(iterable.length === 0){
            resolve([]);
            return;
        }
        let completed = 0;
        let results = [];
        iterable.forEach((promise, index)=>{
            Promise.resolve(promise)
                .then((data)=>{
                    results[index] = {
                        status: 'fulfilled',
                        data
                    };
                })
                .catch((err)=>{
                    results[index] = {
                        status: 'rejected',
                        err
                    };
                })
                .finally(()=>{
                    completed++;
                    if(completed === iterable.length)
                        resolve(results);
                })
        })

    })
}

Promise.prototype.myAny = function(iterable){
    return new Promise((resolve, reject) => {
        if(!Array.isArray(iterable))
            throw new Error("Input must be iterable");
        if(iterable.length === 0){
            resolve([]);
            return;
        }
        let completed = 0;
        let errors = [];
        iterable.forEach((promise, index)=>{
            Promise.resolve(promise)
                .then((data)=>{
                    resolve(data);
                })
                .catch((err)=>{
                    errors[index] = err;
                    completed++;
                    if(completed === iterable.length)
                        reject(new AggregateError(errors, "All promises were rejected"));
                })
        });

    });
}