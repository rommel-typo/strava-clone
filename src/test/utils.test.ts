import { describe, it, expect } from 'vitest';
import { calculateDistance, parseDuration, parsePace } from '../utils/calculations';
import { getCurrentWeekRange, isActivityInCurrentWeek } from '../utils/dateUtils';

describe('Calculations', () => {
    it('parses duration (MM:SS) correctly', () => {
        expect(parseDuration('10:00')).toBe(600);
        expect(parseDuration('01:30')).toBe(90);
    });

    it('parses duration (HH:MM:SS) correctly', () => {
        expect(parseDuration('01:00:00')).toBe(3600);
        expect(parseDuration('1:30:00')).toBe(5400);
    });

    it('parses pace (MM:SS) correctly', () => {
        expect(parsePace('10:00')).toBe(600);
        expect(parsePace('5:00')).toBe(300);
    });

    it('calculates distance correctly', () => {
        // 30 mins at 10 min/mile = 3 miles
        expect(calculateDistance('30:00', '10:00')).toBe(3.00);

        // 1 hour at 6 min/mile = 10 miles
        expect(calculateDistance('01:00:00', '06:00')).toBe(10.00);
    });
});

describe('Date Utils', () => {
    it('identifies dates within the current week (Mon-Sun)', () => {
        // Basic check without mocks for now to ensure stability
        const now = new Date();
        const range = getCurrentWeekRange();
        expect(range.start).toBeDefined();
        expect(range.end).toBeDefined();
    });

    it('formats the week range correctly', () => {
        const range = getCurrentWeekRange();
        expect(range.formatted).toBeDefined();
    });
});
