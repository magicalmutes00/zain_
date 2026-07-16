import { Component, ReactNode, ErrorInfo } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A2647] to-[#144272] px-4">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white/20 mb-4">Oops!</h1>
            <h2 className="text-3xl font-bold text-white mb-4">Something went wrong</h2>
            <p className="text-white/70 mb-8 max-w-md">
              We apologize for the inconvenience. Please try refreshing the page or contact support.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#FF8F5E] transition-colors"
              >
                Refresh Page
              </button>
              <Link
                to="/"
                className="px-6 py-3 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Go Home
              </Link>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <pre className="mt-8 text-left bg-white/10 p-4 rounded-lg text-white text-sm overflow-auto max-w-2xl">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizes[size]} border-4 border-gray-200 border-t-[#FF6B35] rounded-full animate-spin`} />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#051525]">
      <div className="w-16 h-16 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-gray-600 dark:text-gray-300">Loading...</p>
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="py-20 bg-white dark:bg-[#051525]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="skeleton h-10 w-64 mx-auto mb-4" />
          <div className="skeleton h-6 w-96 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-64 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}