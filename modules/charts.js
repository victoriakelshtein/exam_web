export function renderCharts(workouts, stats) {
    renderProgressChart(workouts);
    renderTypesChart(stats.workoutsByType);
}

function renderProgressChart(workouts) {
    const ctx = document.getElementById('progress-chart');
    if (!ctx) return;
    
    const sortedWorkouts = [...workouts].sort((a, b) => new Date(a.date) - new Date(b.date));
    const recentWorkouts = sortedWorkouts.slice(-8);
    
    if (window.progressChart) {
        window.progressChart.destroy();
    }
    
    window.progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: recentWorkouts.map(w => 
                new Date(w.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
            ),
            datasets: [{
                label: 'Прогресс',
                data: recentWorkouts.map(w => w.weight),
                borderColor: '#424242',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: '#f0f0f0'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function renderTypesChart(workoutsByType) {
    const ctx = document.getElementById('types-chart');
    if (!ctx) return;
    
    const types = Object.keys(workoutsByType);
    const counts = Object.values(workoutsByType);
    
    if (window.typesChart) {
        window.typesChart.destroy();
    }
    
    window.typesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: types,
            datasets: [{
                data: counts,
                backgroundColor: '#424242',
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f0f0f0'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}