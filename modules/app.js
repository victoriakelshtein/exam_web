import { updateDate } from './ui.js';
import { loadData } from './data.js';

export function initializeApp() {
    updateDate();
    loadData();
    setupEventListeners();
}

function setupEventListeners() {
    document.addEventListener('dataUpdated', loadData);
    
    setInterval(updateDate, 60000);
}