// VARIABLES
//=================================

//array of secret words
//var dinos = ["tyrannosaurus rex", "apatosaurus", "velociraptor", "stegosaurus", "triceratops", "ankylosaurus", "saurolophus", "pteranodon"];

//object dinos - with name and image for each dino
var dinosaurs=[
    {
        name:"tyrannosaurus rex",
        pic:"assets/images/trex.png"
    },
    {
        name:"apatosaurus",
        pic:"assets/images/littlefoot.png"
    },
    {
        name:"velociraptor",
        pic:"assets/images/velociraptor.png"
    },
    {
        name:"stegosaurus",
        pic:"assets/images/steg.png"
    },
    {
        name:"triceratops",
        pic:"assets/images/cera.png"
    },
    {
        name:"ankylosaurus",
        pic:"assets/images/spike.png"
    },
    {
        name:"saurolophus",
        pic:"assets/images/ducky.jpg"
    },
    {
        name:"pteranodon",
        pic:"assets/images/petrie.png"
    }
]
//empty array to hold all dinosaurs.name values
var dinos = [];

//variable to hold chosen dinosaur object index
var chosenDinoIndex = 0;

//secret word choice
var dinoName = " ";

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
    //saves index of choosen dinosaurs.name
    chosenDinoIndex = dinos.indexOf(word);

    for (let index = 0; index < word.length; index++) {
        guesslist.push(" _ ");  
    }
    targetGuess.innerHTML = guesslist.join(" ");
    return word;
}

function chooseImg(){
    // console.log("chosenDinoIndex: " + chosenDinoIndex);
    // console.log("dinosaurs[chosenDinoIndex].pic: " + dinosaurs[chosenDinoIndex].pic);
    var img = document.createElement("img");
    img.setAttribute("src", dinosaurs[chosenDinoIndex].pic);
    img.setAttribute("class", "dinoPic");
    targetPic.append(img);
    targetPic.replaceChild(img, targetPic.children[0]);
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
    chosenDino = [];
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
dinoName = chooseName();
chooseImg();

//looks for key press
document.onkeyup = function(event){
    //captures key press, converts to lowercase, and saves
    var kp = event.key.toLowerCase();
    // console.log('kp', kp);
    if (kp !== "meta"){
        //add user guess to guessedLetters array & print to screen
        guessedLetters.push(kp);
        targetGuessed.innerHTML= "Letters Guessed: "+"<br />"+ guessedLetters;

        //subtract 1 from guessLeft & print to screen
        --guessLeft;
        targetGL.innerHTML = "Guesses Left: " + guessLeft;
    }else{}

    //checks if kp is in the chosen word and replaces dash in guesslist array with kp value at the given index
    for (let index = 0; index < dinoName.length; index++) {
        if(dinoName[index] === kp){ 
            guesslist[index] = kp;
            count++;
            // indices.push(index);
        }
    }
    //prints updated guesslist to screen
    targetGuess.innerHTML = guesslist.join(" ");
    //console.log("instances of " + kp + " "+ indices);

    if (count === dinoName.length){
        wins++;
        resetGame();
        chooseDino();
        dinoName = chooseName();
        chooseImg();
    }else if (guessLeft < 1 && count !== dinoName.length){
        loss++;
        resetGame();
        chooseDino();
        dinoName = chooseName();
        chooseImg();
    }
}