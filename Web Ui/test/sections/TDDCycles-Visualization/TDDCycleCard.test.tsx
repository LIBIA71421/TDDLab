import { render, fireEvent } from '@testing-library/react';
import TDDCycleCard from '../../../src/sections/TDDCycles-Visualization/components/TDDCycleCard';
import { mockCommitData } from './__mocks__/dataTypeMocks/commitData';
import { mockSuccessJobData, mockFailedJobData } from './__mocks__/dataTypeMocks/jobData';
import '@testing-library/jest-dom';

describe('CycleCard component', () => {
  it('renders the commit message', () => {
    const { getByText } = render(<TDDCycleCard commit={mockCommitData} jobs={null} />);
    const commitMessageElement = getByText('Commit Commit Mock commit message');

    expect(commitMessageElement).toBeInTheDocument();
  });

  it('renders the commit stats', () => {
    const { getByText } = render(<TDDCycleCard commit={mockCommitData} jobs={mockSuccessJobData} />);
  
    const totalText = getByText(/Total: 5/);
    const additionsText = getByText(/Adiciones: 4/);
    const deletionsText = getByText(/Sustracción: 1/);
    const coverageText = getByText(/Cobertura: 80%/);

  expect(totalText).toBeInTheDocument();
  expect(additionsText).toBeInTheDocument();
  expect(deletionsText).toBeInTheDocument();
  expect(coverageText).toBeInTheDocument();
  });

  it('renders the card as success', () => {
    const { getByText } = render(<TDDCycleCard commit={mockCommitData} jobs={mockSuccessJobData} />);
    const commitMessageElement = getByText('Actions: success');

    expect(commitMessageElement).toBeInTheDocument();
  });

  it('renders the card as failed', () => {
    const { getByText } = render(<TDDCycleCard commit={mockCommitData} jobs={mockFailedJobData} />);
    const commitMessageElement = getByText('Actions: failure');
    expect(commitMessageElement).toBeInTheDocument();
  });

  it('renders the card with no actions', () => {
    const { getByText } = render(<TDDCycleCard commit={mockCommitData} jobs={null} />);
  const commitMessageElement = getByText(/Actions weren't Found/);
  expect(commitMessageElement).toBeInTheDocument();
  });

  it('redirects to the GitHub commit page when the "Ver commit" button is clicked', () => {
    const { getByText } = render(<TDDCycleCard commit={mockCommitData} jobs={mockSuccessJobData} />);
    const verCommitButton = getByText('Ver commit');
    expect(verCommitButton).toBeInTheDocument();

    const originalOpen = window.open;
    window.open = jest.fn();

    fireEvent.click(verCommitButton);

    setTimeout(() => {
      expect(window.open).toHaveBeenCalledWith(mockCommitData.html_url, '_blank');
      window.open = originalOpen; // Restore the original window.open
    }, 3000);
  });
});