const readlineSync = require('readline-sync');
const fs = require('fs');

function train(){
    var vocab = fs.readFileSync('./AFINN-111.txt', 'utf8');
    var sepVocab = vocab.split('\n');
    var vocabFreq = {};
    for(var i = 0; i < sepVocab.length; i++){
        var key = "";
        var value = "";
        var found = false;
        for(var j = 0; j < sepVocab[i].length; j++){
            if(sepVocab[i][j] != '\t' && !found){
                key += sepVocab[i][j];
            }
            else if (sepVocab[i][j] != '\t'){
                value += sepVocab[i][j];
            }
            if(sepVocab[i][j] == '\t'){
                found = true;
            }
        }
        found = false;
        vocabFreq[key] = parseInt(value);
    }
    return vocabFreq;
}
var vocabDictionary = train();

/* Analyze Text Document */
var analyzeText = readlineSync.question('Text to Analyze: ');
console.log('Analyzing {' + analyzeText + '}');
var words = analyzeText.split(/\W/);
var score = 0;
for(var i = 0; i < words.length; i++){
    var word = words[i].toLocaleLowerCase();
    if(vocabDictionary.hasOwnProperty(word)){
        score += vocabDictionary[word];
    }
}

/* Compute Score and Return Analysis */
console.log("Score: " + score);
console.log("Comparative Score: " + score / words.length);
if(score / words.length > 0){
    console.log('Positive');
    console.log("Playlists to keep you feeling positive!");
    console.log("https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC");
    console.log("https://open.spotify.com/playlist/4FYU1aJih7ykRIUYenRt8w");
}else if(score / word.length < 0){
    console.log('Negative');
    console.log('Playlists to help you feel better!');
    console.log("https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0");
    console.log("https://open.spotify.com/playlist/37i9dQZF1DWTwnEm1IYyoj");
    console.log("https://open.spotify.com/playlist/37i9dQZF1DX889U0CL85jj");
}else{
    console.log('Neutral');
    console.log("https://open.spotify.com/playlist/37i9dQZF1DWTwnEm1IYyoj");
    console.log("https://open.spotify.com/playlist/37i9dQZF1DX889U0CL85jj");
}