import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProgressSet from '.';

describe('renders ProgressSet', () => {

  test('with 2 bars and 3 buttons', () => {
    const { getAllByTestId } = render(<ProgressSet bars={[100, 200]} buttons={[100, 200, -100]} limit={300} />);

    const bars = getAllByTestId('bar');
    expect(bars.length).toBe(2);

    const buttons = getAllByTestId('button');
    expect(buttons.length).toBe(3);
  });

  test('increments 1st progress properly', () => {
    const { getAllByTestId } = render(<ProgressSet bars={[100, 200]} buttons={[100, 200, -100]} limit={300} />);

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    fireEvent(getAllByTestId('button')[0], event)

    const bar = getAllByTestId('bar')[0]
    expect(bar.style.width).toContain('67%')
  });

  test('decrements 2st progress properly', () => {
    const { container, getAllByTestId } = render(<ProgressSet bars={[100, 200]} buttons={[100, 200, -100]} limit={300} />);

    // select 2nd progress bar
    const select = container.querySelector('select')
    fireEvent.change(select, { target: { value: "1" } });

    // click 3rd button
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    fireEvent(getAllByTestId('button')[2], event);

    // check 2nd progress bar
    const bar = getAllByTestId('bar')[1]
    expect(bar.style.width).toContain('33%')
  });
});
