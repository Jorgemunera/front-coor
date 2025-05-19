import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard Page', () => {
  test('renders dashboard title', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Welcome to the Dashboard/i)).toBeInTheDocument();
  });

  test('renders description paragraph', () => {
    render(<Dashboard />);
    expect(screen.getByText(/protected route/i)).toBeInTheDocument();
  });
});
