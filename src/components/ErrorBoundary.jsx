import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center bg-paper px-4 text-ink">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Something went wrong</h2>
            <p className="mt-2 text-ink/60">{this.state.error?.message}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-6 border border-ink px-4 py-2 text-xs uppercase tracking-[0.4em] transition hover:bg-ink hover:text-paper"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
