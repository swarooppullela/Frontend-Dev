function memoize(fn){
    let cache = {};
    return function(n){
        if(cache.hasOwnProperty(n))
            return cache[n];
        const result = fn(n);
        cache[n] = result;
        return result;
    }
}