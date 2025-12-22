'use client';

import { Provider } from 'react-redux';
import store from '../redux/store';
import ErrorBoundary from '../components/ErrorBoundary';
import { ThemeContext } from '../hooks/useToggle';
import '../styles/globals.css';
import { useState } from 'react';


export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('dark');
  
  const changeTheme = () => {
    setTheme((prev) => prev === 'dark' ? 'light' : 'dark');
  };
  return (
    <html lang="en">
      <head>
        <title>Contact Form - Next.js with Redux Saga</title>
        <meta name="description" content="Contact form with Redux Saga and form validation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Provider store={store}>
          <ErrorBoundary>
            <ThemeContext.Provider value={{theme, changeTheme}}>
              {children}
            </ThemeContext.Provider>
          </ErrorBoundary>
        </Provider>
      </body>
    </html>
  );
}
