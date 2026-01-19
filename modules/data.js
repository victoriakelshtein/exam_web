import { getWorkouts, saveWorkout } from './storage.js';
import { calculateStatistics } from './statistics.js';
import { renderCharts } from './charts.js';
import { renderWorkoutForm, renderWorkoutHistory } from './workoutInput.js';
import { renderStatsCards } from './ui.js';

export function loadData() {
    const workouts = getWorkouts();
    const stats = calculateStatistics(workouts);
    
    renderStatsCards(stats);
    renderWorkoutForm();
    renderWorkoutHistory(workouts);
    renderCharts(workouts, stats);
}