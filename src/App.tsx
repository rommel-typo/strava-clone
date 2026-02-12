import { ActivityForm } from './components/ActivityForm';
import { ActivityFeed } from './components/ActivityFeed';
import { useActivities } from './hooks/useActivities';

function App() {
    const { activities, addActivity } = useActivities();

    return (
        <div className="min-h-screen bg-gray-100 p-4 font-sans">
            <nav className="bg-white border-b border-gray-200 fixed top-0 w-full z-10 left-0 h-16 flex items-center px-4 md:px-8">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Strava_Logo.svg/1280px-Strava_Logo.svg.png" alt="Strava" className="h-8" />
            </nav>

            <div className="max-w-3xl mx-auto mt-20">
                <ActivityForm onSave={addActivity} />
                <ActivityFeed activities={activities} />
            </div>
        </div>
    );
}

export default App;
