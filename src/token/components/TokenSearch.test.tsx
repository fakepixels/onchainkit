/**
 * @jest-environment jsdom
 */
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { TokenSearch } from './TokenSearch';

describe('TokenSearch component', () => {
  it('should call onChange after the specified debounce delay', async () => {
    const handleChange = jest.fn();

    const { getByRole } = render(<TokenSearch onChange={handleChange} />);

    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalledTimes(0);

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith('test'), { timeout: 300 });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should call onChange immediately with no debounce delay', async () => {
    const handleChange = jest.fn();

    const { getByRole } = render(<TokenSearch onChange={handleChange} delayMs={0} />);

    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith('test'));
  });

  it('clears the input when the clear button is clicked', async () => {
    const handleChange = jest.fn();
    const { getByTestId, getByRole } = render(<TokenSearch onChange={handleChange} />);

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    const clearButton = getByTestId('ockTextInput_Clear');
    fireEvent.click(clearButton);

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith(''));
  });
});
