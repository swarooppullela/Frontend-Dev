'use client';

import { Provider } from 'react-redux';
import store from '../redux/store';
import ErrorBoundary from '../components/ErrorBoundary';
import SessionTimeout from '../components/SessionTimeout';
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
              <SessionTimeout 
                timeoutDuration={15 * 60 * 1000}  // 15 minutes
                warningDuration={2 * 60 * 1000}   // 2 minutes warning
                onTimeout={() => {
                  console.log('Session expired');
                  // Custom logout logic can go here
                }}
                onWarning={() => {
                  console.log('Session expiring soon');
                }}
              />
              {children}
            </ThemeContext.Provider>
          </ErrorBoundary>
        </Provider>
      </body>
    </html>
  );
}
