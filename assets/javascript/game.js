// VARIABLES
//=================================

//array of secret words
var dinos = ["tyrannosaurus rex", "apatosaurus", "velociraptor", "stegosaurus", "triceratops", "ankylosaurus", "saurolophus", "pteranodon"];

//score variables
var wins = 0;
var guessLeft = 10;

//secret word to guess empty array
var guesslist = [];

//guessed letters empty array
var guessedLetters = [];

//empty array for indices
var indices = [];

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
var dino = chooseWord();

//looks for key press
document.onkeyup = function(event){
    //captures key press, converts to lowercase, and saves
    var kp = event.key.toLowerCase();

    //add user guess to guessedLetters array & print to screen
    guessedLetters.push(kp);
    targetGuessed.innerHTML = "Letters Guessed: "+ guessedLetters;

    //subtract 1 from guessLeft & print to screen
    --guessLeft;
    targetGL.innerHTML = "Guesses Left: " + guessLeft;

    //checks if kp is in the chosen word
    for (let index = 0; index < dino.length; index++) {
        if(dino[index] === kp){ indices.push(index);}
    }
    console.log("instances of " + kp + " "+ indices);
}