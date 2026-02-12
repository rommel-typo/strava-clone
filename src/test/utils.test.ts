import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateDistance, parseDuration, parsePace } from '../utils/calculations';
import { getCurrentWeekRange, isActivityInCurrentWeek } from '../utils/dateUtils';
import { addDays, format, subDays } from 'date-fns';

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
    beforeEach(() => {
        // Mock date to a Wednesday
        vi.useFakeTimers();
        const mockDate = new Date(2023, 9, 11); // Oct 11, 2023 (Wednesday)
        vi.setSystemTime(mockDate);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('identifies dates within the current week (Mon-Sun)', () => {
        const monday = '2023-10-09T10:00:00Z';
        const sunday = '2023-10-15T23:59:59Z';
        const nextMonday = '2023-10-16T10:00:00Z';
        const prevSunday = '2023-10-08T23:59:59Z';

        expect(isActivityInCurrentWeek(monday)).toBe(true);
        expect(isActivityInCurrentWeek(sunday)).toBe(true);
        expect(isActivityInCurrentWeek(nextMonday)).toBe(false);
        expect(isActivityInCurrentWeek(prevSunday)).toBe(false);
    });

    it('formats the week range correctly', () => {
        const range = getCurrentWeekRange();
        expect(range.formatted).toBe('Oct 9, 2023 - Oct 15, 2023');
    });
});
