class ScaleExercise {
    constructor(scalePatterns) {
        this.scalePatterns = scalePatterns;
        this.selectedScale = [];
        this.clickCounter = 1;
    }

    initialize(challengeElementId, optionsContainerId, resultElementId) {
        this.challengeElement = document.getElementById(challengeElementId);
        this.optionsContainer = document.getElementById(optionsContainerId);
        this.resultElement = document.getElementById(resultElementId);
        this.setNewChallenge();
        this.addEventListeners();
    }

    setNewChallenge() {
        this.selectedScale = [];
        this.clickCounter = 1;
        this.currentPattern = this.scalePatterns[Math.floor(Math.random() * this.scalePatterns.length)];
        this.challengeElement.classList.add('centered-message');
        this.challengeElement.textContent = `Construa a escala de ${this.currentPattern.root} (${this.currentPattern.type})`;
        this.resultElement.textContent = '';
        this.renderOptions();
        this.clearSelection();
    }
    

    renderOptions() {
        const allNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        this.optionsContainer.innerHTML = '';
        allNotes.forEach(note => {
            const button = document.createElement('button');
            button.classList.add('note-option');
            button.setAttribute('data-note', note);
            button.textContent = note;
            const counter = document.createElement('span');
            counter.classList.add('counter');
            button.appendChild(counter);
            this.optionsContainer.appendChild(button);
        });
    }

    addEventListeners() {
        const noteOptions = Array.from(this.optionsContainer.children);
        noteOptions.forEach(option => {
            option.addEventListener('click', () => {
                if (this.selectedScale.length < this.currentPattern.scale.length) {
                    this.selectNoteOption(option);
                }
            });
        });

        const checkScaleButton = document.getElementById('checkScaleButton');
        checkScaleButton.addEventListener('click', () => this.checkScale());

        const resetScaleButton = document.getElementById('resetScaleButton');
        resetScaleButton.addEventListener('click', () => this.setNewChallenge());
    }

    selectNoteOption(option) {
        const selectedNote = option.getAttribute('data-note');
        if (!this.selectedScale.includes(selectedNote)) {
            this.selectedScale.push(selectedNote);
            option.classList.add('selected');
            option.querySelector('.counter').textContent = this.clickCounter++;
        }
    }

    clearSelection() {
        const noteOptions = Array.from(this.optionsContainer.children);
        noteOptions.forEach(option => {
            option.classList.remove('selected');
            option.querySelector('.counter').textContent = '';
        });
    }

    checkScale() {
        if (this.arraysEqual(this.selectedScale, this.currentPattern.scale)) {
            this.resultElement.textContent = 'Parabéns! Você construiu a escala corretamente.';
            this.resultElement.style.color = 'green';
        } else {
            this.resultElement.textContent = 'Ops! A escala não está correta. Tente novamente.';
            this.resultElement.style.color = 'red';
        }
    }

    arraysEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const scalePatterns = [
        { root: 'C', type: 'Maior', scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
        { root: 'G', type: 'Maior', scale: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'] },
        { root: 'A', type: 'Menor', scale: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] }
    ];
    const scaleExercise = new ScaleExercise(scalePatterns);
    scaleExercise.initialize('scaleChallenge', 'scaleOptions', 'scaleResult');

    document.getElementById('resetScaleButton').addEventListener('click', () => {
        scaleExercise.setNewChallenge();
    });
});