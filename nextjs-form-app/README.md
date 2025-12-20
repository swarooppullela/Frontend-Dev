# Next.js Form Application with Redux Saga

A modern contact form application built with Next.js 14, Redux for state management, Redux Saga for handling async API calls, and a custom Error Boundary HOC.

## Features

- ✨ **Next.js 14** with App Router
- 🔄 **Redux** for state management
- 🎯 **Redux Saga** for handling side effects
- ✅ **Form Validations** (name, email, phone, message)
- 🛡️ **Custom Error Boundary HOC** for error handling
- 🎨 **Responsive Design** with CSS Modules
- 📱 **Mobile-friendly** interface

## Getting Started

### Installation

1. Navigate to the project directory:
```bash
cd nextjs-form-app
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
nextjs-form-app/
├── app/
│   ├── layout.js          # Root layout with Redux Provider
│   └── page.js            # Home page with ContactForm
├── components/
│   ├── ContactForm.js     # Main form component with validations
│   └── ErrorBoundary.js   # Custom Error Boundary HOC
├── pages/
│   └── api/
│       └── submit-form.js # API route for form submission
├── redux/
│   ├── actions/
│   │   └── formActions.js # Redux actions
│   ├── reducers/
│   │   ├── formReducer.js # Form reducer
│   │   └── index.js       # Root reducer
│   ├── sagas/
│   │   ├── formSaga.js    # Form saga
│   │   └── index.js       # Root saga
│   └── store.js           # Redux store configuration
├── styles/
│   ├── globals.css        # Global styles
│   └── ContactForm.module.css # Form component styles
└── package.json
```

## Form Validations

The form includes the following validations:

- **Name**: Required, minimum 2 characters, letters only
- **Email**: Required, valid email format
- **Phone**: Required, 10 digits
- **Message**: Required, minimum 10 characters

## Redux Saga Flow

1. User submits form
2. Form validation runs
3. If valid, `submitFormRequest` action is dispatched
4. Redux Saga intercepts the action
5. Saga makes API call to `/api/submit-form`
6. On success: `submitFormSuccess` action is dispatched
7. On failure: `submitFormFailure` action is dispatched
8. Form state updates and UI reflects the result

## Error Boundary

The custom Error Boundary HOC catches React component errors and displays a fallback UI with:
- User-friendly error message
- Error details (in development)
- "Try Again" button to reset the error state

## API Endpoint

**POST** `/api/submit-form`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Your message here"
}
```

Response:
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "data": {
    "submittedAt": "2025-12-17T10:30:00.000Z",
    "id": "abc123xyz"
  }
}
```

## Technologies Used

- **Next.js 14**: React framework for production
- **React 18**: UI library
- **Redux Toolkit**: State management
- **Redux Saga**: Side effects management
- **Axios**: HTTP client
- **CSS Modules**: Component-scoped styling

## License

MIT
