// VARIABLES
//=================================

//array of secret words
//var dinos = ["tyrannosaurus rex", "apatosaurus", "velociraptor", "stegosaurus", "triceratops", "ankylosaurus", "saurolophus", "pteranodon"];

var dinos = [];

//object dinos - with name and image for each dino
var dinosaurs=[
    {
        name:"tyrannosaurus rex",
        pic:"../images/trex.png"
    },
    {
        name:"apatosaurus",
        pic:"../images/littlefoot.png"
    },
    {
        name:"velociraptor",
        pic:"../images/velociraptor.png"
    },
    {
        name:"stegosaurus",
        pic:"../images/steg.png"
    },
    {
        name:"triceratops",
        pic:"../images/cera.png"
    },
    {
        name:"ankylosaurus",
        pic:"../images/spike.png"
    },
    {
        name:"saurolophus",
        pic:"../images/ducky.jpg"
    },
    {
        name:"pteranodon",
        pic:"../images/petrie.png"
    }
]

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
var targetPic = document.getElementById("dino-pic");
var targetGuess = document.getElementById("to-guess");
var targetGuessed = document.getElementById("guessed-letters");
var targetGL = document.getElementById("guesses-left");


// FUNCTIONS
//=================================

//function that returns random dino from array dinos
function chooseName (){
    const word = dinos[Math.floor(Math.random() * dinos.length)];
    console.log(word + " letters: " + word.length);

    //console.log("index of dinoName: " + dinos.indexOf(word));

    for (let index = 0; index < word.length; index++) {
        guesslist.push(" _ ");  
    }
    targetGuess.innerHTML = guesslist.join(" ");
    return word;
}

function chooseImg(x){
    // targetPic.parentNode.removeChild(targetPic);
    var img = document.createElement("img");
    img.setAttribute("src", dinosaurs.indexOf(x).pic);
    console.log( "src: " + dinosaurs.indexOf(x).pic);
    document.getElementById("dino-pic").append(img);
}

function chooseDino(){
    for (let index = 0; index < dinosaurs.length; index++) {
        dinos.push(dinosaurs[index].name);   
    }
    // console.log("dino names: " + dinos);
}

function resetGame(){
    //resets variables
    guessLeft = 15;
    guesslist = [];
    guessedLetters = [];
    dinos= [];
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
chooseDino();
dino = chooseName();
chooseImg(dino);

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
        chooseDino();
        dino = chooseName();
        chooseImg(dino);
    }else if (guessLeft < 1 && count !== dino.length){
        loss++;
        resetGame();
        chooseDino();
        dino = chooseName();
        chooseImg(dino);
    }
}