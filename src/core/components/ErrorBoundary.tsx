import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div style={{ padding: "4rem 2rem", textAlign: "center", fontFamily: "monospace" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>SYSTEM_ERROR</h2>
            <p style={{ opacity: 0.6 }}>Something went wrong. Please refresh the page.</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
