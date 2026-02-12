import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
    it('renders the Strava Clone header', () => {
        render(<App />);
        expect(screen.getByText(/STRAVA/i)).toBeInTheDocument();
    });

    it('renders the Activity Form', () => {
        render(<App />);
        expect(screen.getByText(/Add Activity/i)).toBeInTheDocument();
    });
});
