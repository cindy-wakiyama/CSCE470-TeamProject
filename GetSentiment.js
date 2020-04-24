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




  /* Load the HTTP library */
  var http = require("http");

  /* Create an HTTP server to handle responses */
  http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Social Genre");
    /* Compute Score and Return Analysis */
    response.write("Score: " + score);
    response.write("\nComparative Score: " + score / words.length);
    if(score / words.length > 0){
        response.write('\nPositive Attitude\n');
        response.write("Playlists to keep you feeling positive!\n");
        response.write("https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC\n");
        response.write("https://open.spotify.com/playlist/4FYU1aJih7ykRIUYenRt8w\n");
    }else if(score / words.length < 0){
        response.write('\nNegative Attitude\n');
        response.write('Playlists to help you feel better!');
        response.write("https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0\n");
        response.write("https://open.spotify.com/playlist/37i9dQZF1DWTwnEm1IYyoj\n");
        response.write("https://open.spotify.com/playlist/37i9dQZF1DX889U0CL85jj\n");
    }else{
        response.write('\nNeutral Attitude\n');
        response.write("https://open.spotify.com/playlist/37i9dQZF1DWTwnEm1IYyoj\n");
        response.write("https://open.spotify.com/playlist/37i9dQZF1DX889U0CL85jj\n");
    }
    response.end();
  }).listen(8888);