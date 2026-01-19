import { saveWorkout, deleteWorkout } from './storage.js';

export function renderWorkoutForm() {
    const container = document.getElementById('workout-form');
    if (!container) return;
    
    container.innerHTML = `
        <form id="new-workout-form">
            <div class="form-group">
                <label for="workout-type">Тип тренировки</label>
                <select id="workout-type" required>
                    <option value="">Выберите тип</option>
                    <option value="Силовая">Силовая</option>
                    <option value="Кардио">Кардио</option>
                    <option value="Йога">Йога</option>
                    <option value="Бег">Бег</option>
                </select>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="weight">Вес (кг)</label>
                    <input type="number" id="weight" min="1" max="200" step="0.5" required>
                </div>
                
                <div class="form-group">
                    <label for="duration">Время (мин)</label>
                    <input type="number" id="duration" min="5" max="300" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="calories">Калории</label>
                    <input type="number" id="calories" min="50" max="2000" required>
                </div>
                
                <div class="form-group">
                    <label for="distance">Дистанция (км)</label>
                    <input type="number" id="distance" min="0" max="100" step="0.1">
                </div>
            </div>
            
            <div class="form-group">
                <label for="notes">Заметки</label>
                <input type="text" id="notes" placeholder="Опишите тренировку">
            </div>
            
            <button type="submit">Сохранить</button>
        </form>
    `;
    
    const form = document.getElementById('new-workout-form');
    form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const workout = {
        type: document.getElementById('workout-type').value,
        weight: parseFloat(document.getElementById('weight').value),
        duration: parseInt(document.getElementById('duration').value),
        calories: parseInt(document.getElementById('calories').value),
        distance: parseFloat(document.getElementById('distance').value) || 0,
        notes: document.getElementById('notes').value
    };
    
    saveWorkout(workout);
    document.getElementById('new-workout-form').reset();
    document.dispatchEvent(new CustomEvent('dataUpdated'));
}

export function renderWorkoutHistory(workouts) {
    const container = document.getElementById('workout-history');
    if (!container) return;
    
    if (workouts.length === 0) {
        container.innerHTML = '<p>Нет тренировок</p>';
        return;
    }
    
    workouts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = workouts.map(workout => `
        <div class="workout-item">
            <div class="workout-info">
                <h3>${workout.type}</h3>
                <div class="workout-meta">
                    <span>${workout.weight} кг</span>
                    <span>${workout.duration} мин</span>
                    <span>${workout.calories} кал</span>
                    ${workout.distance ? `<span>${workout.distance} км</span>` : ''}
                </div>
                ${workout.notes ? `<p class="workout-notes">${workout.notes}</p>` : ''}
            </div>
            <div>
                <div class="workout-date">${formatDate(workout.date)}</div>
                <button class="delete-btn" onclick="deleteWorkout('${workout.id}')">Удалить</button>
            </div>
        </div>
    `).join('');
    
    window.deleteWorkout = function(id) {
        if (confirm('Удалить тренировку?')) {
            deleteWorkout(id);
            document.dispatchEvent(new CustomEvent('dataUpdated'));
        }
    };
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
}