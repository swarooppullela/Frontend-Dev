import { useEffect, useState } from 'react';
import { Products } from './components/Products';
import './App.css';
import Loader from './components/Loader';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load (e.g., fetching config, user data, etc.)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <Loader />
          <h1>Loading</h1>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello, Page Loaded!</h1>
      </header>
      <main>
        <Products.Root>
          <Products.SortDropDown />
          <Products.GridView />
        </Products.Root>
      </main>
    </div>
  );
}

export default App;
