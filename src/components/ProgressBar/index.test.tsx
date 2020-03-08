import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from '.';

describe('renders ProgressBar', () => {
  test('with value', () => {
    const { getByText } = render(<ProgressBar value={80} />);
    const element = getByText(/80%/i);
    expect(element).toBeInTheDocument();
  });

  test('not beyond 100%', () => {
    const { getByText } = render(<ProgressBar value={200} />);
    const element = getByText(/100%/i);
    expect(element).toBeInTheDocument();
  });

  test('not below 0%', () => {
    const { getByText } = render(<ProgressBar value={-200} />);
    const element = getByText(/0%/i);
    expect(element).toBeInTheDocument();
  });

  test('w.r.t limit', () => {
    const { getByText } = render(<ProgressBar value={100} limit={300} />);
    const element = getByText(/33%/i);
    expect(element).toBeInTheDocument();
  });

  test('with error indicator', () => {
    const { getByTestId } = render(<ProgressBar value={400} limit={300} />);
    const element = getByTestId('bar');
    expect(element).toBeInTheDocument();

    const background = window.getComputedStyle(element).background;
    expect(background).toBe("red");
  });
});
