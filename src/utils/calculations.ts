export const parseDuration = (duration: string): number => {
    const parts = duration.split(':').map(Number);
    if (parts.some(isNaN)) return 0;

    if (parts.length === 3) {
        // HH:MM:SS
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
        // MM:SS
        return parts[0] * 60 + parts[1];
    }
    return 0;
};

export const parsePace = (pace: string): number => {
    // Expected format "MM:SS"
    const parts = pace.split(':').map(Number);
    if (parts.some(isNaN) || parts.length !== 2) return 0;
    return parts[0] * 60 + parts[1];
};

export const calculateDistance = (durationStr: string, paceStr: string): number => {
    const durationSec = parseDuration(durationStr);
    const paceSec = parsePace(paceStr);

    if (paceSec === 0) return 0;

    const distance = durationSec / paceSec;
    return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

export const formatDuration = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (h > 0) {
        return `${h}h ${m}m ${s}s`;
    }
    return `${m}m ${s}s`;
};
