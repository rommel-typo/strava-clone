import { startOfWeek, endOfWeek, format, isWithinInterval, parseISO } from 'date-fns';

export const getCurrentWeekRange = () => {
    const now = new Date();
    // Strava weeks usually start on Monday
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });

    return {
        start,
        end,
        formatted: `${format(start, 'MMM d, yyyy')} - ${format(end, 'MMM d, yyyy')}`
    };
};

export const isActivityInCurrentWeek = (activityDateStr: string): boolean => {
    const { start, end } = getCurrentWeekRange();
    const date = parseISO(activityDateStr);
    return isWithinInterval(date, { start, end });
};

export const formatActivityDate = (dateStr: string): string => {
    return format(parseISO(dateStr), "MMMM d, yyyy 'at' h:mm aa");
};
