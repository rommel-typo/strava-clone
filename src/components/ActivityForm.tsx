import React, { useState, useEffect } from 'react';
import { calculateDistance } from '../utils/calculations';
import { Activity } from '../types';

interface Props {
    onSave: (activity: Activity) => void;
}

export const ActivityForm: React.FC<Props> = ({ onSave }) => {
    const [title, setTitle] = useState('Morning Run');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
    const [duration, setDuration] = useState('');
    const [pace, setPace] = useState('');
    const [distance, setDistance] = useState<number | null>(null);

    useEffect(() => {
        if (duration && pace) {
            const dist = calculateDistance(duration, pace);
            setDistance(dist);
        } else {
            setDistance(null);
        }
    }, [duration, pace]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!distance) return;

        const newActivity: Activity = {
            id: crypto.randomUUID(),
            title,
            date: new Date(date).toISOString(),
            duration,
            pace,
            distance,
            type: 'Run'
        };

        onSave(newActivity);
        // Reset form
        setTitle('Morning Run');
        setDuration('');
        // Keep date and pace as they might be similar? No, reset duration.
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-subtle mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add Activity</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Date & Time</label>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Time (Duration)</label>
                    <input
                        type="text"
                        placeholder="e.g. 30:00 or 1:05:00"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Pace</label>
                    <input
                        type="text"
                        placeholder="e.g. 9:30"
                        value={pace}
                        onChange={(e) => setPace(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                        required
                    />
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className="text-lg font-semibold text-gray-700">
                    Distance: <span className="text-orange-600 font-strava text-2xl">{distance ? `${distance} mi` : '--'}</span>
                </div>
                <button
                    type="submit"
                    disabled={!distance}
                    className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition disabled:opacity-50"
                >
                    Create Activity
                </button>
            </div>
        </form>
    );
};
