import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by Error Boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="error-boundary">
          <div className="error-container">
            <h1>Oops! Something went wrong</h1>
            <p>We're sorry for the inconvenience. An error has occurred.</p>
            {this.state.error && (
              <details className="error-details">
                <summary>Error Details</summary>
                <pre>{this.state.error.toString()}</pre>
                {this.state.errorInfo && (
                  <pre>{this.state.errorInfo.componentStack}</pre>
                )}
              </details>
            )}
            <button onClick={this.resetError} className="retry-button">
              Try Again
            </button>
          </div>
          <style jsx>{`
            .error-boundary {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 20px;
            }
            .error-container {
              background: white;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
              max-width: 600px;
              text-align: center;
            }
            h1 {
              color: #e53e3e;
              margin-bottom: 16px;
              font-size: 28px;
            }
            p {
              color: #4a5568;
              margin-bottom: 24px;
              font-size: 16px;
            }
            .error-details {
              text-align: left;
              margin: 20px 0;
              padding: 16px;
              background: #f7fafc;
              border-radius: 6px;
              border: 1px solid #e2e8f0;
            }
            .error-details summary {
              cursor: pointer;
              color: #4299e1;
              font-weight: 600;
              margin-bottom: 8px;
            }
            .error-details pre {
              white-space: pre-wrap;
              word-wrap: break-word;
              font-size: 12px;
              color: #e53e3e;
              margin-top: 8px;
            }
            .retry-button {
              background: #4299e1;
              color: white;
              border: none;
              padding: 12px 32px;
              border-radius: 6px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              transition: background 0.3s ease;
            }
            .retry-button:hover {
              background: #3182ce;
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher Order Component
export const withErrorBoundary = (Component) => {
  return function WithErrorBoundaryComponent(props) {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

export default ErrorBoundary;
