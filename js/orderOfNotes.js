class Note {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    render() {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note-option');
        noteElement.id = this.id;
        noteElement.innerHTML = `${this.name} <span class="counter"></span>`;
        return noteElement;
    }
}

class NoteExercise {
    constructor(containerId, correctOrder) {
        this.container = document.getElementById(containerId);
        this.container.classList.add('note-options');
        this.correctOrder = correctOrder;
        this.selectedOrder = [];
        this.clickCounter = 1;
    }

    initialize(notes) {
        this.notes = notes.map(note => new Note(note.id, note.name));
        this.shuffleNotes();
        this.renderNotes();
        this.addEventListeners();
    }

    shuffleNotes() {
        for (let i = this.notes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.notes[i], this.notes[j]] = [this.notes[j], this.notes[i]];
        }
    }

    renderNotes() {
        this.container.innerHTML = '';
        this.notes.forEach(note => {
            this.container.appendChild(note.render());
        });
    }

    addEventListeners() {
        this.notes.forEach(note => {
            const noteElement = document.getElementById(note.id);
            noteElement.addEventListener('click', () => this.selectNote(note));
        });
    }

    selectNote(note) {
        if (!this.selectedOrder.includes(note.id)) {
            this.selectedOrder.push(note.id);
            const noteElement = document.getElementById(note.id);
            noteElement.classList.add('selected');
            noteElement.querySelector('.counter').textContent = this.clickCounter++;
        }
    }

    checkOrder(resultElementId) {
        const resultElement = document.getElementById(resultElementId);
        if (this.arraysEqual(this.selectedOrder, this.correctOrder)) {
            resultElement.textContent = 'Parabéns! As notas estão na ordem correta.';
            resultElement.style.color = 'green';
        } else {
            resultElement.textContent = 'Ops! As notas não estão na ordem correta. Tente novamente.';
            resultElement.style.color = 'red';
        }
    }

    reset(resultElementId) {
        this.selectedOrder = [];
        this.clickCounter = 1;
        this.renderNotes();
        this.addEventListeners();
        document.getElementById(resultElementId).textContent = '';
    }

    arraysEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const orderOfNotesExercise = new NoteExercise('notesContainer', ['C', 'D', 'E', 'F', 'G', 'A', 'B']);
    orderOfNotesExercise.initialize([
        { id: 'C', name: 'C (Dó)' },
        { id: 'D', name: 'D (Ré)' },
        { id: 'E', name: 'E (Mi)' },
        { id: 'F', name: 'F (Fá)' },
        { id: 'G', name: 'G (Sol)' },
        { id: 'A', name: 'A (Lá)' },
        { id: 'B', name: 'B (Si)' }
    ]);

    document.getElementById('checkOrderButton').addEventListener('click', () => {
        orderOfNotesExercise.checkOrder('result');
    });

    document.getElementById('resetButton').addEventListener('click', () => {
        orderOfNotesExercise.reset('result');
    });
});
