class GuessNoteExercise {
    constructor(noteSequence) {
        this.noteSequence = noteSequence;
    }

    initialize(noteElementId, resultElementId, optionsContainerId) {
        this.noteElement = document.getElementById(noteElementId);
        this.resultElement = document.getElementById(resultElementId);
        this.optionsContainer = document.getElementById(optionsContainerId);
        this.setNewChallenge();
        this.addEventListeners();
    }

    setNewChallenge() {
        this.currentNote = this.getRandomNote();
        this.noteElement.textContent = `Qual é a nota anterior a ${this.currentNote}?`;
        this.resultElement.textContent = '';
        this.clearSelection();
    }

    getRandomNote() {
        const randomIndex = Math.floor(Math.random() * this.noteSequence.length);
        return this.noteSequence[randomIndex];
    }

    addEventListeners() {
        const noteOptions = Array.from(this.optionsContainer.children);
        noteOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.clearSelection();
                option.classList.add('selected');
                const selectedNote = option.getAttribute('data-note');
                this.checkAnswer(selectedNote);
            });
        });
    }

    clearSelection() {
        const noteOptions = Array.from(this.optionsContainer.children);
        noteOptions.forEach(option => {
            option.classList.remove('selected');
        });
    }

    checkAnswer(selectedNote) {
        const correctIndex = this.noteSequence.indexOf(this.currentNote);
        const correctAnswer = this.noteSequence[(correctIndex - 1 + this.noteSequence.length) % this.noteSequence.length];

        if (selectedNote === correctAnswer) {
            this.resultElement.textContent = 'Correto! Parabéns!';
            this.resultElement.style.color = 'green';
        } else {
            this.resultElement.textContent = 'Errado! Tente novamente.';
            this.resultElement.style.color = 'red';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const guessNoteExercise = new GuessNoteExercise(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
    guessNoteExercise.initialize('currentNote', 'challengeResult', 'noteOptions');

    document.getElementById('resetChallengeButton').addEventListener('click', () => {
        guessNoteExercise.setNewChallenge();
    });
});