import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StyleGuideTab from './StyleGuideTab';

describe('StyleGuideTab', () => {
  it('renders all 3 category headings', () => {
    render(<StyleGuideTab />);
    expect(screen.getByRole('heading', { name: 'ARPEGGIO' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'BEAT' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'PHRASE' })).toBeInTheDocument();
  });

  it('renders all 9 style names, one button per style', () => {
    render(<StyleGuideTab />);
    expect(screen.getByRole('button', { name: 'Style 1: Arpeggio (8th)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Style 2: Arpeggio (16th)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Style 3: Note Duration' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Style 4: 16th Pattern A' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Style 5: 16th Pattern B' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Style 6: Chord Phrases (Simple)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Style 7: Chord Phrases (Rhythmic)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Style 8: Strummed Chord Phrases (Simple)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Style 9: Strummed Chord Phrases (Rhythmic)' })).toBeInTheDocument();
  });

  it('keeps all variations hidden by default', () => {
    render(<StyleGuideTab />);
    expect(screen.queryByText('UP1 (8th)')).not.toBeInTheDocument();
    expect(screen.queryByText('Double Whole note')).not.toBeInTheDocument();
  });

  it('expands a style card to reveal its 12 variations on click', async () => {
    const user = userEvent.setup();
    render(<StyleGuideTab />);

    const header = screen.getByRole('button', { name: 'Style 1: Arpeggio (8th)' });
    expect(header).toHaveAttribute('aria-expanded', 'false');

    await user.click(header);

    expect(header).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('UP1 (8th)')).toBeInTheDocument();
    expect(screen.getByText('UP2 (8th Triplet)')).toBeInTheDocument();

    const panelId = header.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    expect(within(panel).getAllByRole('listitem')).toHaveLength(12);
  });

  it('shows the tilde notation verbatim when BEAT 16th Pattern A is expanded', async () => {
    const user = userEvent.setup();
    render(<StyleGuideTab />);

    await user.click(screen.getByRole('button', { name: 'Style 4: 16th Pattern A' }));

    expect(screen.getByText('o~~o (dotted 8th and 16th)')).toBeInTheDocument();
    expect(screen.getByText('o~o_ (8th and 16th)')).toBeInTheDocument();
  });

  it('shows a "blank slots" note instead of a variation list for PHRASE styles', async () => {
    const user = userEvent.setup();
    render(<StyleGuideTab />);

    await user.click(screen.getByRole('button', { name: 'Style 6: Chord Phrases (Simple)' }));

    expect(screen.getByText(/12 Roland preset phrases/i)).toBeInTheDocument();
    expect(screen.queryByText('UP1 (8th)')).not.toBeInTheDocument();
  });

  it('collapses an expanded style card when clicked again', async () => {
    const user = userEvent.setup();
    render(<StyleGuideTab />);

    const header = screen.getByRole('button', { name: 'Style 3: Note Duration' });
    await user.click(header);
    expect(screen.getByText('Double Whole note')).toBeInTheDocument();

    await user.click(header);
    expect(screen.queryByText('Double Whole note')).not.toBeInTheDocument();
    expect(header).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders the notation legend', () => {
    render(<StyleGuideTab />);
    expect(screen.getByRole('heading', { name: /Notation/i })).toBeInTheDocument();
    expect(screen.getByText('16th note')).toBeInTheDocument();
    expect(screen.getByText('dotted eighth note')).toBeInTheDocument();
  });
});
