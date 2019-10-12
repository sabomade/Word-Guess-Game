// VARIABLES
//=================================

//array of secret words
var dinos = ["tyrannosaurus rex", "apatosaurus", "velociraptor", "stegosaurus", "triceratops", "ankylosaurus", "saurolophus", "pteranodon"];

//score variables
var wins = 0;
var guessLeft = 10;

//secret word to guess array
var guesslist = [];

//guessed letters array
var guessedLetters = [];

//grab id's of divs to write to
var targetScore = document.getElementById("score");
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

//print values on screen
targetScore.innerHTML = "Wins: " + wins;
targetGL.innerHTML = "Guesses Left: " + guessLeft;
targetGuessed.innerHTML = "Letters Guessed: "+ guessedLetters;

// MAIN PROCESS
//=================================

//starts the game
chooseWord();

//looks for key press
document.onkeyup = function(event){
    //captures key press, converts to lowercase, and saves
    var kp = event.key.toLowerCase();

    //add user guess to guessedLetters array
    guessedLetters.push(kp);

    //print guessedLetters array to screen
    targetGuessed.innerHTML = "Letters Guessed: "+ guessedLetters;

    //subtract 1 from guessLeft
    --guessLeft;
    targetGL.innerHTML = "Guesses Left: " + guessLeft;

}