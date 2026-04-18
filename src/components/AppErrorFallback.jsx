import './AppErrorFallback.css';

export default function AppErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-fallback" role="alert">
      <h1>Something went wrong</h1>
      <p>The app hit an unexpected error. Try again, or reload the page.</p>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
      {import.meta.env.DEV && (
        <details>
          <summary>Error details (dev only)</summary>
          <pre>{error.message}</pre>
        </details>
      )}
    </div>
  );
}
