import * as React from "react";

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>{
    constructor(props: ErrorBoundaryProps){
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(){
        return {hasError: true};
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error(`Error ${error} info: ${errorInfo}`);
    }

    render(){
        if(this.state.hasError){
            return <h1>Something went wrong. Check your logs for more info</h1>;
        }
        return this.props.children;
    }
}
