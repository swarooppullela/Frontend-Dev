'use client';

import { Provider } from 'react-redux';
import store from '../redux/store';
import ErrorBoundary from '../components/ErrorBoundary';
import '../styles/globals.css';

export default function RootLayout({ children }) {
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
            {children}
          </ErrorBoundary>
        </Provider>
      </body>
    </html>
  );
}
