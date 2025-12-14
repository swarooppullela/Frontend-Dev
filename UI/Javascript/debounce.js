function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function onSearch(text) {
  console.log("API call with:", text);
}

const debouncedSearch = debounce(onSearch, 300);

// call many times → runs once after user stops
debouncedSearch("r");
debouncedSearch("re");
debouncedSearch("rea");