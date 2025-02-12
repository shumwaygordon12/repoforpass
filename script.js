// Update the clock
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Toggle dark mode
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Notes functionality with local storage
document.getElementById('add-note').addEventListener('click', () => {
    const noteInput = document.getElementById('note-input');
    const noteText = noteInput.value.trim();
    if (noteText) {
        addNoteToList(noteText);
        saveNoteToLocal(noteText);
        noteInput.value = '';
    }
});

function addNoteToList(text) {
    const li = document.createElement('li');
    li.innerHTML = `${text} <button onclick="removeNote(this)">X</button>`;
    document.getElementById('notes-list').appendChild(li);
}

function removeNote(button) {
    const noteText = button.parentElement.innerText.slice(0, -2);
    removeNoteFromLocal(noteText);
    button.parentElement.remove();
}

// Save notes to localStorage
function saveNoteToLocal(note) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Load notes from localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(addNoteToList);
}

function removeNoteFromLocal(note) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(n => n !== note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

loadNotes();
