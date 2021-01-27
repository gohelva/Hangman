var languages=[
    "python",
    "java",
    "javascript",
    "mongodb",
    "json",
    "html",
    "css",
    "c",
    "cpp",
    "csharp",
    "golong",
    "kotlin",
    "php",
    "sql",
    "ruby"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
    answer=languages[Math.floor(Math.random()*languages.length)];
    
}


function generateButtons(){
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
            <button
                class="btn btn-lg btn-primary m-2"
                id='`+letter+`'
                onClick="handleGuess('`+ letter +`')"
            >
            `+ letter +`
            </button>
        `).join('');
    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenletter){
    guessed.indexOf(chosenletter) === -1 ? guessed.push(chosenletter) : null;
    document.getElementById(chosenletter).setAttribute('disabled', true);
    
    if(answer.indexOf(chosenletter) >= 0){
        guessedWord();
        checkIfGameWon();
    }
    else if(answer.indexOf(chosenletter) === -1){
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

function updateHangmanPicture(){
    document.getElementById('hangmanpic').src='./images/'+ mistakes + '.png';
}

function checkIfGameWon() {
    if(wordStatus === answer){
        document.getElementById('keyboard').innerHTML='You Won!!';
    }
}


function checkIfGameLost() {
    if(mistakes === maxWrong){
        document.getElementById('wordSpotlight').innerHTML = 'The answer was : ' +answer;
        document.getElementById('keyboard').innerHTML='You Lost!!';
    }
}

function updateMistakes(){
   
    document.getElementById('mistakes').innerHTML = mistakes;
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >=0 ? letter : " _ ")).join('');
    document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

function reset(){
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanpic').src = './images/0.png';
    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;
document.getElementById('mistakes').innerHTML = mistakes;


randomWord();
generateButtons();
guessedWord();