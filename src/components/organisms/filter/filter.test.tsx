import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import { Filter } from './filter';

import { FilterTypes } from '../../../emuns/filter-types.enum';

describe('Filter', () => {
  it('should render Filter correctly with current filter', () => {
    const mockOnFilterChange = vi.fn();

    render(<Filter currentFilter={FilterTypes.popular} onChange={mockOnFilterChange} />);

    const currentFilter = screen.getByText(FilterTypes.popular, { selector: '.places__sorting-type' });
    expect(currentFilter).toBeInTheDocument();

    const filterOptions = screen.getByRole('list', { hidden: true });
    expect(filterOptions).toHaveClass('places__options');
    expect(filterOptions).not.toHaveClass('places__options--opened');
  });

  it('should toggle dropdown visibility when clicked', () => {
    const mockOnFilterChange = vi.fn();

    render(<Filter currentFilter={FilterTypes.popular} onChange={mockOnFilterChange} />);

    const dropdownToggle = screen.getByText(FilterTypes.popular, { selector: '.places__sorting-type' });
    fireEvent.click(dropdownToggle);

    const filterOptions = screen.getByRole('list');
    expect(filterOptions).toHaveClass('places__options--opened');

    fireEvent.click(dropdownToggle);

    expect(filterOptions).not.toHaveClass('places__options--opened');
  });

  it('should call onFilterChange with the selected filter', () => {
    const mockOnFilterChange = vi.fn();

    render(<Filter currentFilter={FilterTypes.popular} onChange={mockOnFilterChange} />);

    const dropdownToggle = screen.getByText(FilterTypes.popular, { selector: '.places__sorting-type' });
    fireEvent.click(dropdownToggle);

    const highToLowOption = screen.getByText(FilterTypes.highToLow, { selector: '.places__option' });
    fireEvent.click(highToLowOption);

    expect(mockOnFilterChange).toHaveBeenCalledWith(FilterTypes.highToLow);
  });

  it('should highlight the active filter', () => {
    const mockOnFilterChange = vi.fn();

    render(<Filter currentFilter={FilterTypes.highToLow} onChange={mockOnFilterChange} />);

    const activeFilter = screen.getByText(FilterTypes.highToLow, { selector: '.places__option--active' });
    expect(activeFilter).toBeInTheDocument();
  });
});
