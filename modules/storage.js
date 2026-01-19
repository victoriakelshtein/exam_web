const STORAGE_KEY = 'workouts-data';

export function getWorkouts() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveWorkout(workout) {
    const workouts = getWorkouts();
    workouts.push({
        ...workout,
        id: Date.now().toString(),
        date: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
    return workouts;
}

export function deleteWorkout(id) {
    let workouts = getWorkouts();
    workouts = workouts.filter(workout => workout.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
    return workouts;
}