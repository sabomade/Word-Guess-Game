// VARIABLES
//=================================

//array of secret words
var dinos = ["tyrannosaurus rex", "apatosaurus", "velociraptor", "stegosaurus", "triceratops", "ankylosaurus", "saurolophus", "pteranodon"];

//secret word choice
var dino = " ";

//score variables
var wins = 0;
var loss = 0;
var guessLeft = 15;

//secret word to guess empty array
var guesslist = [];

//guessed letters empty array
var guessedLetters = [];

//empty array for indices
var indices = [];

//counter for # of times keypress was added to guesslist
var count = 0;

//grab id's of divs to write to
var targetScoreW = document.getElementById("scoreW");
var targetScoreL = document.getElementById("scoreL");
var targetphoto = document.getElementById("photo");
var targetGuess = document.getElementById("to-guess");
var targetGuessed = document.getElementById("guessed-letters");
var targetGL = document.getElementById("guesses-left");


// FUNCTIONS
//=================================

//function that returns random dino from array dinos
function chooseWord (){
    const word = dinos[Math.floor(Math.random() * dinos.length)];
    console.log(word + " letters: " + word.length);

    for (let index = 0; index < word.length; index++) {
        guesslist.push(" _ ");  
    }
    targetGuess.innerHTML = guesslist.join(" ");
    return word;
}

function resetGame(){
    //resets variables
    guessLeft = 15;
    guesslist = [];
    guessedLetters = [];
    count = 0;

    //print values on screen
    targetScoreW.innerHTML = "Wins: " + wins;
    targetScoreL.innerHTML = "Lose: " + loss;
    targetGL.innerHTML = "Guesses Left: " + guessLeft;
    targetGuessed.innerHTML = "Letters Guessed: " + guessedLetters;
}

// MAIN PROCESS
//=================================

//starts the game
resetGame();
dino = chooseWord();

//looks for key press
document.onkeyup = function(event){
    //captures key press, converts to lowercase, and saves
    var kp = event.key.toLowerCase();
    // console.log('kp', kp);
    if (kp !== "meta"){
        //add user guess to guessedLetters array & print to screen
        guessedLetters.push(kp);
        targetGuessed.innerText= "Letters Guessed: "+ guessedLetters;

        //subtract 1 from guessLeft & print to screen
        --guessLeft;
        targetGL.innerHTML = "Guesses Left: " + guessLeft;
    }else{}

    //checks if kp is in the chosen word and replaces dash in guesslist array with kp value at the given index
    for (let index = 0; index < dino.length; index++) {
        if(dino[index] === kp){ 
            guesslist[index] = kp;
            count++;
            // indices.push(index);
        }
    }
    //prints updated guesslist to screen
    targetGuess.innerHTML = guesslist.join(" ");
    //console.log("instances of " + kp + " "+ indices);

    if (count === dino.length){
        wins++;
        resetGame();
        dino = chooseWord();
    }else if (guessLeft < 1 && count !== dino.length){
        loss++;
        resetGame();
        dino = chooseWord();
    }
}