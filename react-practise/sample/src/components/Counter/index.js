import { useEffect, useRef, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    // Prevent multiple intervals
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    pause();
    setCount(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;
