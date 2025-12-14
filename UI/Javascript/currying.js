function sum(a){
    return function(b){
        if(b){
            return sum(a+b);
        }
        return a;
    }
}

console.log(sum(1)(2)(3)(4)());

// OR
let sum = a => b => b ? sum(a+b): a;
console.log(sum(1)(2)(3)(4)());