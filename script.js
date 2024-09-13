let startTime, interval;
const inputTextArea = document.getElementById('input-area');
const restartBtn = document.getElementById('restart-test-button');
const endTestBtn = document.getElementById('end-test-button');
const timeTakenSpan = document.getElementById('time-taken');
const textToTypeElement = document.getElementById('text-to-type');

const texts = {
    text1: "A Associação Portuguesa de Desportos é uma sociedade civil, sem fins lucrativos caracterizando-se como entidade esportiva, social, recreativa, assistencial, educacional e filantrópica. A ideia de uma unidade associativa de colônia lisutana vinha sendo alimentada desde de 1913 e finalmente consumou-se a 14 de agosto de 1920, em uma noite memorável, nunca reunião histórica no Salão da Câmara Portuguesa de Comercio, com a fusão de cinco clubes representantes da colônia portuguesa: Lusíada, Portugal Marinhense, Cinco de Outubro, Marques de Pombal e Lusitano. Nessa mesma data, no século XIV, Portugal derrotou a Espanha na Batalha de Aljubarrota, marcando o primeiro passo para se desligar do Reino de Castela. A primeira diretoria, da então chamada Associação Portuguesa de Esportes, foi presidida pelo farmacêutico Eugenio Augusto Torres Lima. No ano de 1940, foi então assinada a Certidão de Nascimento da Associação Portuguesa de Desportos, devido ao diversificado número de esportes complementados com várias atividades de lazer. Foram escolhidas para o Clube, as cores verde e vermelho que remetem às cores da bandeira de Portugal. O escudo português, em fundo branco, foi o primeiro distintivo adotado pela Portuguesa, em uma reunião realizada da camisa de time havia sido substituído pela Cruz de Avis. A Cruz de Avis significa a glória das Grandes Cruzadas e com ela a idade de ouro de Portugal.",

    text2: "Os fios de cabelo são estruturas fascinantes que desempenham papéis importantes na proteção e na estética. Cada fio de cabelo é composto por três camadas principais: a cutícula, o córtex e a medula. A cutícula é a camada externa, formada por células sobrepostas que protegem as camadas internas e conferem brilho ao cabelo. O córtex, a camada intermediária, é responsável pela força e elasticidade do cabelo devido à presença de proteínas como a queratina. A medula, que pode estar ausente em alguns fios, é a camada central e pode ajudar na absorção de nutrientes.Um fio de cabelo pode crescer, em média, cerca de 1 a 1,5 centímetros por mês, e o crescimento pode ser influenciado por fatores como genética, dieta e cuidados com o cabelo. Curiosamente, os fios de cabelo possuem uma vida útil média de 2 a 7 anos antes de caírem naturalmente. A cor dos cabelos é determinada pela quantidade e tipo de melanina presente no córtex. A melanina é um pigmento que varia em cor, resultando em diferentes tons de cabelo, desde o loiro até o preto. Além disso, cada fio de cabelo tem uma capacidade impressionante de resistência; em média, um fio pode suportar até 100 gramas de peso. O ciclo de crescimento do cabelo inclui fases de crescimento (anágena), repouso (catágena) e queda (telógena). Manter uma alimentação equilibrada e cuidados adequados pode promover a saúde e a aparência dos cabelos, refletindo a importância dos fios na proteção e na estética do corpo humano.",

    text3: "O Brasil, o maior país da América Latina, é conhecido por sua diversidade cultural e natural impressionante. Com uma área de cerca de 8,5 milhões de quilômetros quadrados, o país possui a maior floresta tropical do mundo, a Amazônia, que abriga aproximadamente 10% da biodiversidade global. O Brasil é o lar de mais de 200 milhões de pessoas e possui uma vasta gama de etnias e culturas, resultado de uma rica história de imigração e colonização. Curiosamente, o Brasil é o único país da América do Sul que fala predominantemente português, uma herança da colonização portuguesa. A língua portuguesa é uma das mais faladas do mundo, refletindo a influência cultural de Portugal. O país também é conhecido por suas festas vibrantes, como o Carnaval do Rio de Janeiro, que atrai milhões de turistas todos os anos com suas paradas exuberantes e danças animadas. No campo da geografia, o Brasil é notável por suas vastas áreas de relevo diversificado, incluindo a Serra do Mar e o Pantanal, que é uma das maiores áreas alagadas do mundo e um ponto crucial para a conservação de muitas espécies animais. Além disso, o Brasil possui o Cristo Redentor, uma das Novas Sete Maravilhas do Mundo, que é um símbolo icônico do Rio de Janeiro e um testemunho da grandiosidade cultural e arquitetônica do país.",

    text4: "O futebol, esporte globalmente popular, tem uma história rica e fascinante. Embora formas de jogos com bola tenham sido jogadas em várias culturas antigas, o futebol moderno começou a tomar forma na Inglaterra durante o século XIX. Em 1863, a Football Association (FA) foi fundada, estabelecendo as primeiras regras padronizadas do jogo, conhecidas como 'Regras de Cambridge'. Essas regras ajudaram a separar o futebol de outros esportes de bola, como o rugby. O futebol rapidamente se espalhou pelo mundo, com clubes e associações sendo formados em diversos países. Em 1904, foi criada a FIFA (Federação Internacional de Futebol Association) para organizar e regulamentar o esporte internacionalmente. A primeira Copa do Mundo da FIFA ocorreu em 1930 no Uruguai, e desde então, o torneio se tornou um evento global de grande importância.O futebol no Brasil ganhou destaque com o surgimento de jogadores lendários como Pelé e Zico. Pelé, em particular, é frequentemente considerado um dos maiores jogadores de todos os tempos, tendo conquistado três Copas do Mundo (1958, 1962 e 1970). O esporte também se tornou uma paixão nacional no Brasil, com campeonatos como o Brasileirão e a Copa Libertadores atraindo milhões de torcedores. Hoje, o futebol continua a unir pessoas em todo o mundo, com ligas, clubes e seleções nacionais competindo em níveis profissionais e amadores, refletindo a universalidade e o impacto cultural do esporte."
};

// Adiciona evento de clique para cada botão de texto
document.querySelectorAll('.text-button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove a classe "active" de todos os botões
        document.querySelectorAll('.text-button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Adiciona a classe "active" ao botão clicado
        this.classList.add('active');

        // Atualiza o texto conforme o botão clicado
        const textKey = this.getAttribute('data-text');
        textToTypeElement.textContent = texts[textKey];
        
        // Reinicia o campo de texto e cronômetro
        inputTextArea.value = '';
        inputTextArea.disabled = false;
        inputTextArea.focus();
        startTime = new Date();
        interval = setInterval(updateTimer, 1000);
    });
});

// Botões para reiniciar e encerrar o teste
restartBtn.addEventListener('click', restartTest);
endTestBtn.addEventListener('click', endTest);

// Bloqueia a colagem no campo de texto
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

    alert(resultText);
}

function countErrors() {
    const typedText = inputTextArea.value;
    let errors = 0;
    const textToType = textToTypeElement.textContent;

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

    if (timeElapsed >= 720 && !inputTextArea.classList.contains('time-limit-passed')) {
        alert("O tempo limite de 12 minutos foi excedido. Você está reprovado.");
        inputTextArea.classList.add('time-limit-passed'); // Marca que o tempo limite já foi excedido
    }
}
