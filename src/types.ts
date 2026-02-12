export interface Activity {
    id: string;
    title: string;
    date: string; // ISO string
    duration: string; // HH:MM:SS or MM:SS
    pace: string; // MM:SS
    distance: number;
    type: 'Run' | 'Ride' | 'Swim' | 'Walk'; // For now just Run
}
