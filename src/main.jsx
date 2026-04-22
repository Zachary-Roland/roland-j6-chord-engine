import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App.jsx'
import AppErrorFallback from './components/layout/AppErrorFallback.jsx'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={AppErrorFallback}
      onError={(error, info) => {
        console.error('ErrorBoundary caught:', error, info)
      }}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
