// Given string find minimum no of chars that need to be replaced to make string palindrome in js prog

function minCharCountPalindrome(str){
    if(typeof str !== "string") console.log("Input must be string");
    const strArray = str.split("");
    console.log(strArray);
    let count = 0;
    let i=0, j = strArray.length-1;
    while(i<j){
        if(strArray[i] !== strArray[j]) count++;
        i++;
        j--;
    }
    return count;
}

console.log(minCharCountPalindrome("abbbcca"));


//Given an array of n ints, return number of strictly increasing subsequence of length 2 in js

function incrsSubSeq(arr){
    let count =0;
   for(let i=0;i<arr.length;i++){
       for(let j=i+1; j<arr.length;j++){
           if(arr[i]<arr[j]) count++;
       }
   }
    return count;
}

console.log(incrsSubSeq([1,2,3]));