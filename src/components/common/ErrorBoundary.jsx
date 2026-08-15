import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary tərəfindən tutulan xəta:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Xəta baş verdi!</h2>
          <p>Tətbiq gözlənilmədən dayandı. Səhifəni yeniləməyə cəhd edin.</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Səhifəni Yenilə
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
