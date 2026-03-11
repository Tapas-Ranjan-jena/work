import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="container mt-5">
                    <div className="card shadow-sm border-danger">
                        <div className="card-body text-center p-5">
                            <h3 className="text-danger mb-3">Something went wrong.</h3>
                            <p className="text-muted mb-4">
                                The application encountered an unexpected error.
                                Please try refreshing the page.
                            </p>
                            <details className="text-start mb-4" style={{ whiteSpace: 'pre-wrap', opacity: 0.7 }}>
                                {this.state.error && this.state.error.toString()}
                            </details>
                            <button
                                className="btn btn-primary"
                                onClick={() => window.location.reload()}
                            >
                                Reload Page
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
