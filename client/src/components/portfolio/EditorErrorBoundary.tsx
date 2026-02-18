import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertCircle, RefreshCw, Terminal, Copy, ChevronDown, ChevronRight } from 'lucide-react';

/* ================================================================
   ERROR BOUNDARY — VS Code–style "Something went wrong" screen
   ================================================================
   Class component (required for getDerivedStateFromError).
   Wraps content sections so a crash in one file doesn't break
   the entire editor. Shows a styled error screen mimicking
   VS Code's crash page with stack trace and recovery options.
   ================================================================ */

interface ErrorBoundaryProps {
  children: ReactNode;
  /** File name shown in the error title (e.g. "Projects.jsx") */
  fileName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  showDetails: boolean;
}

class EditorErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, showDetails: false };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[EditorErrorBoundary]', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, showDetails: false });
  };

  handleCopyError = () => {
    const { error } = this.state;
    if (error) {
      const text = `${error.name}: ${error.message}\n\n${error.stack || ''}`;
      navigator.clipboard.writeText(text).catch(() => {});
    }
  };

  toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const { error, showDetails } = this.state;
    const fileName = this.props.fileName || 'Unknown';

    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-6 select-none">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{ background: 'color-mix(in srgb, var(--destructive, #e74c3c) 15%, transparent)' }}
        >
          <AlertCircle
            className="w-8 h-8"
            style={{ color: 'var(--destructive, #e74c3c)' }}
          />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-foreground mb-1">
          Something went wrong
        </h2>
        <p className="text-sm text-muted-foreground text-center max-w-md mb-5">
          The editor encountered an error while rendering{' '}
          <span className="font-mono px-1 py-0.5 rounded text-xs" style={{
            background: 'color-mix(in srgb, var(--muted) 80%, transparent)',
            color: 'var(--syntax-string)',
          }}>
            {fileName}
          </span>
        </p>

        {/* Error message box */}
        <div
          className="w-full max-w-lg rounded-md border border-border overflow-hidden mb-5"
          style={{ background: 'color-mix(in srgb, var(--destructive, #e74c3c) 5%, var(--card))' }}
        >
          {/* Error header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-border">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground">ERROR</span>
            </div>
            <button
              onClick={this.handleCopyError}
              className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded hover:bg-muted transition-colors text-muted-foreground"
              title="Copy error to clipboard"
            >
              <Copy className="w-3 h-3" />
              Copy
            </button>
          </div>

          {/* Error body */}
          <div className="px-3 py-2.5">
            <p className="text-xs font-mono leading-relaxed" style={{ color: 'var(--destructive, #e74c3c)' }}>
              {error?.name}: {error?.message}
            </p>
          </div>

          {/* Collapsible stack trace */}
          {error?.stack && (
            <div className="border-t border-border">
              <button
                onClick={this.toggleDetails}
                className="flex items-center gap-1.5 w-full px-3 py-1.5 text-[10px] text-muted-foreground hover:bg-muted/50 transition-colors"
              >
                {showDetails ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
                Stack Trace
              </button>
              {showDetails && (
                <pre className="px-3 pb-2.5 text-[10px] font-mono text-muted-foreground leading-relaxed overflow-x-auto max-h-40 whitespace-pre-wrap break-all">
                  {error.stack}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded transition-colors text-primary-foreground"
            style={{ background: 'var(--primary)' }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reload File
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded border border-border bg-muted hover:bg-muted/80 transition-colors text-foreground"
          >
            Reload Window
          </button>
        </div>

        {/* Footer hint */}
        <p className="mt-5 text-[10px] text-muted-foreground/60 text-center">
          If this persists, try opening a different file or reloading the page.
          <br />
          Press <kbd className="px-1 py-0.5 rounded border border-border text-muted-foreground bg-muted text-[9px] mx-0.5">Ctrl+Shift+I</kbd> to check the console for details.
        </p>
      </div>
    );
  }
}

export default EditorErrorBoundary;
