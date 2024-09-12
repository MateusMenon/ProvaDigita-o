let startTime, interval;
const textToType = document.getElementById('text-to-type').textContent;
const inputTextArea = document.getElementById('input-area');
const restartBtn = document.getElementById('restart-test-button');
const endTestBtn = document.getElementById('end-test-button');
const timeTakenSpan = document.getElementById('time-taken');

restartBtn.addEventListener('click', restartTest);
endTestBtn.addEventListener('click', endTest);

inputTextArea.addEventListener('paste', function(event) {
    event.preventDefault(); // Impede a colagem
    alert('Colar não é permitido.');
});

function restartTest() {
    clearInterval(interval);
    inputTextArea.value = '';
    inputTextArea.disabled = false;
    inputTextArea.focus();
    startTime = new Date();
    interval = setInterval(updateTimer, 1000);
}

function endTest() {
    clearInterval(interval);
    const timeElapsed = (new Date() - startTime) / 1000;
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = Math.floor(timeElapsed % 60);
    const errors = countErrors();
    
    let resultText = `Tempo: ${minutes}m ${seconds}s | Erros: ${errors}`;

    if (timeElapsed <= 720 && errors <= 4) { // 720 segundos = 12 minutos
        resultText += ' | Resultado: Aprovado';
    } else {
        resultText += ' | Resultado: Reprovado';
    }

    timeTakenSpan.textContent = `${minutes}.${seconds.toString().padStart(2, '0')}`;
    alert(resultText);

    inputTextArea.disabled = true;
}

function countErrors() {
    const typedText = inputTextArea.value;
    let errors = 0;

    for (let i = 0; i < textToType.length; i++) {
        if (typedText[i] !== textToType[i]) {
            errors++;
        }
    }

    return errors;
}

function updateTimer() {
    const timeElapsed = (new Date() - startTime) / 1000;
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = Math.floor(timeElapsed % 60);
    timeTakenSpan.textContent = `${minutes}.${seconds.toString().padStart(2, '0')}`;

    if (timeElapsed >= 720) { // 720 segundos = 12 minutos
        endTest();
    }
}

