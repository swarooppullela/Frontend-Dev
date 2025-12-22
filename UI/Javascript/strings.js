// non repeating character of a string
const firstNonRepeatingChar = (str) => {
  const freq = str.split("").reduce((acc, ch) => {
    acc[ch] = (acc[ch] || 0) + 1;
    return acc;
  }, {});

  return str.split("").find(ch => freq[ch] === 1) || null;
};



// { h: 1, e: 1, l: 2, o: 1 }
const charCount = (str) =>
  str.split("").reduce((acc, ch) => {
    acc[ch] = (acc[ch] || 0) + 1;
    return acc;
  }, {});

console.log(charCount("hello"));
