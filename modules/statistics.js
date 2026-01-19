export function calculateStatistics(workouts) {
    if (workouts.length === 0) {
        return {
            totalWorkouts: 0,
            avgWeight: 0,
            totalCalories: 0,
            avgDuration: 0,
            workoutsByType: {}
        };
    }
    
    const stats = {
        totalWorkouts: workouts.length,
        avgWeight: calculateAverage(workouts.map(w => w.weight)),
        totalCalories: workouts.reduce((sum, w) => sum + w.calories, 0),
        avgDuration: calculateAverage(workouts.map(w => w.duration)),
        workoutsByType: groupByType(workouts)
    };
    
    return stats;
}

function calculateAverage(numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b, 0);
    return (sum / numbers.length).toFixed(1);
}

function groupByType(workouts) {
    return workouts.reduce((groups, workout) => {
        groups[workout.type] = (groups[workout.type] || 0) + 1;
        return groups;
    }, {});
}