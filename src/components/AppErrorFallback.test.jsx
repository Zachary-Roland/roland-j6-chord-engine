import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from 'react-error-boundary';
import AppErrorFallback from './AppErrorFallback';

function Bomb({ shouldThrow }) {
  if (shouldThrow) throw new Error('boom');
  return <div>healthy child</div>;
}

describe('AppErrorFallback + ErrorBoundary wiring', () => {
  let errorSpy;

  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary FallbackComponent={AppErrorFallback}>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText('healthy child')).toBeInTheDocument();
  });

  it('renders fallback UI when a child throws', () => {
    render(
      <ErrorBoundary FallbackComponent={AppErrorFallback}>
        <Bomb shouldThrow />
      </ErrorBoundary>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('calls onReset when the user clicks "Try again"', async () => {
    const user = userEvent.setup();
    const handleReset = vi.fn();

    render(
      <ErrorBoundary FallbackComponent={AppErrorFallback} onReset={handleReset}>
        <Bomb shouldThrow />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: /try again/i }));
    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
