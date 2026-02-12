import { useState, useEffect } from 'react';
import { Activity } from '../types';

const STORAGE_KEY = 'strava-clone-activities';

export const useActivities = () => {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setActivities(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse activities', e);
            }
        }
    }, []);

    const addActivity = (activity: Activity) => {
        const updated = [activity, ...activities];
        setActivities(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const deleteActivity = (id: string) => {
        const updated = activities.filter(a => a.id !== id);
        setActivities(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    return { activities, addActivity, deleteActivity };
};
