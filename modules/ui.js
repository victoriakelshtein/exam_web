export function updateDate() {
    const dateElement = document.getElementById('current-date');
    if (!dateElement) return;
    
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    dateElement.textContent = now.toLocaleDateString('ru-RU', options);
}

export function renderStatsCards(stats) {
    const container = document.getElementById('stats-cards');
    if (!container) return;
    
    container.innerHTML = `
        <div class="stat-card">
            <div class="stat-value">${stats.totalWorkouts}</div>
            <div class="stat-label">Тренировки</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-value">${stats.avgWeight}</div>
            <div class="stat-label">Средний вес</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-value">${stats.totalCalories}</div>
            <div class="stat-label">Калории</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-value">${stats.avgDuration}</div>
            <div class="stat-label">Минут</div>
        </div>
    `;
}