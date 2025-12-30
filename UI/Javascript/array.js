// input : [1,2,3,[4,5,6,[7,8,[10,11]]],9];
// output: [1,2,3,4,5,6,7,8,10,11,9];

let arr1 = [1,2,3,[4,5,6,[7,8,[10,11]]],9];

const flatArray = (arr) => {
    return arr.reduce((acc, ele) => {
        if (Array.isArray(ele)) {
            acc.push(...flatArray(ele));
        } else {
            acc.push(ele)
        }
        return acc;
    }, []);
}
console.log(flatArray(arr1));




//input [42,10,19,6,8,7,9,325,0,428,23] , size : 3
//output [[42,10,19], [6,8,7], [9,235,0], [428,23]];

const chunkArray = (arr, size) =>
  arr.reduce((acc, item, index) => {
    // If index is multiple of size, start a new chunk
    if (index % size === 0) {
      acc.push([item]);
    } else {
      acc[acc.length - 1].push(item);
    }
    return acc;
  }, []);

const input = [42,10,19,6,8,7,9,325,0,428,23];
const size = 3;
console.log(chunkArray(input, size));



// replace repeated values with 1
// input [1,2,3,2,3,4] output [1,1,1,1,4]

const replaceRepeatedWithOne = (arr) => {
  const freq = arr.reduce((acc, n) => {
    acc[n] = (acc[n] || 0) + 1;
    return acc;
  }, {});
  
  console.log(freq);

  return arr.map(n => (freq[n] > 1 ? 1 : n));
};

const inp2 = [1,2,3,2,3,4];
console.log(replaceRepeatedWithOne(inp2));

// Write a function which takes a parameter of variable length 
// example: ['a', 1] , ['b', 2], undefined, null, ['a', 3] 
// returns the object as follows: { a: [1,3], b:[2] }

function inputCheck(...args) {
  let input = args.filter(ele => Array.isArray(ele) && ele.length > 0);

  let finalRes = {};

  input.forEach(inp => {
    const key = inp[0];
    const value = inp[1];

    if (finalRes[key]) {
      finalRes[key] = [...finalRes[key], value];
    } else {
      finalRes[key] = [value];
    }
  });

  return finalRes;
}


//input [5, 6, 8, 9,10, 13, 15];
// output: [7,11,12,14]

let arr = [5, 6, 8, 9, 10, 13, 15];

let missingElements = (arr) => {
  let res = [];

  arr.map((ele, index) => {
    if (index === 0) return; // no previous for first element

    let prevEle = arr[index - 1];

    // push all missing numbers between prevEle and ele
    while (ele - prevEle > 1) {
      prevEle++;
      res.push(prevEle);
    }
  });

  return res;
};

console.log(missingElements(arr)); // [7, 11, 12, 14]




