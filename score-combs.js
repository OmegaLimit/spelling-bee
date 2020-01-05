/**
 * This program scores each honeycomb.
 */
const combs = 7; // The number of combs in the puzzle.
const stopValue = 33554432;  // 2**25
const aStop = 1048576;      // 2**20
const bStop = 2097152;      // 2**21
const cStop = 4194304;      // 2**22
const dStop = 8388608;      // 2**23
const eStop = 16777216;     // 2**24
const fStop = 33554432;     // 2**25

var HallOfFameScores = [0,0,0,0,0,0,0,0,0,0];
var HallOfFameCombs = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];

var words = [];
var wordScores = [];
var normalizedWords = [];

function run() {
  
  var remainder;
  var center, a, b, c, d, e, f, i, j, normWord, score;
  
  prepWords();
  
  for(center = 1; center < stopValue; center = center<<1) {
    console.log("Checking: " + denormalize(center));
    for(a = 1; a < aStop; a = a<<1) {
      if(a === center) a = a<<1;
      for(b = a<<1; b < bStop; b = b<<1) {
        if(b === center) b = b<<1;
        for(c = b<<1; c < cStop; c = c<<1) {
          if(c === center) c = c<<1;
          for(d = c<<1; d < dStop; d = d<<1) {
            if(d === center) d = d<<1;
            for(e = d<<1; e < eStop; e = e<<1) {
              if(e === center) e = e<<1;
              for(f = e<<1; f < fStop; f = f<<1) {
                if(f === center) f = f<<1;
                remainder = a | b | c | d | e | f;
                score = 0;
                for(i = 0; i < words.length; i++) {
                  normWord = normalizedWords[i];
                  if(((center & normWord) === center) && (((center | remainder) & normWord) === normWord)) score += wordScores[i];
                }
                for(j = 0; j < HallOfFameScores.length; j++) {
                  if(HallOfFameScores[j] < score) {
                    HallOfFameScores[j] = score;
                    HallOfFameCombs[j] = [center,remainder];
                    j = HallOfFameScores.length;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  output();
}

function prepWords() {
  console.log("Preparing words.");
  for(var i = 0; i < words.length; i++) {
    wordScores.push(scoreWord(words[i]));
    normalizedWords.push(normalizedForm(words[i]));
  }
  console.log("Words Prepared.");
}

function normalizedForm(word) {
  
  var returnInt = 0;
  var charArray = Array.from(new Set(word));
  charArray.sort();
  for(var i = 0; i < charArray.length; i++) returnInt = (returnInt | (2**(charArray[i].charCodeAt(0) - ((charArray[i].charCodeAt(0) > 115)?98:97))));
  
  return returnInt;
}

function scoreWord(word) {
  var score = 0;
  if(word.length === 4) score = 1;
  else score = word.length;
  
  if(countLetters(word) === combs) score += combs;
  
  return score;
}

/**
 * Counts the number of letters in a word.
 */
function countLetters(word) {
  
  var letterCount = 0;
  
  for(var i = 0; i < 26; i++) {
    if(word.includes(String.fromCharCode(97 + i))) letterCount++;
  }
  
  return letterCount;
}

function output() {
  outputStr = "";
  for(var i = 0; i < HallOfFameScores.length; i++) {
    outputStr += "<p>" + denormalize(HallOfFameCombs[i][0]) + ", " + denormalize(HallOfFameCombs[i][1])+ " Score: " + HallOfFameScores[i] + "</p>";
  }
  document.getElementById("output").innerHTML = outputStr;
}

/**
 * This code handles the file input. It is triggered by the "run-button".
 * This function loads the provided word list and then strips out any words with an "s", is less than four letters, or contains more than seven different letters.
 */
function openWords() {
  
  console.log("Program started.");
  
  /* Triggers the "edmd-file" input that is hidden in the HTML page. */
  document.getElementById("words-file").click();
  
  console.log("Program completed.");
}

/**
 * This function reads the words from the list
 */
function readWords(files) {
  console.log("Words file selection started.");
  
  /* retrieves the selected file and checks that only one file is selected. */
  if (files.length < 1) alert("No file loaded.");
  else if (files.length > 1) alert("Please select only one file.");
  else {
    /* reads the file */
    var file = files[0];
    var reader = new FileReader();
    reader.onload = loadWords;
    reader.readAsText(file);
  }
  
  console.log("Words file section ended.");
}

function loadWords(e) {
  
  /* Split the intput into lines. Each line is it's own element of the array. */
  words = e.target.result.split("\n");
  document.getElementById("load-button").disabled = true;
  document.getElementById("run-button").disabled = false;
  console.log("Words loaded: " + words.length);
}

function denormalize(normWord) {
  var denormWord = [];
  var bitMask = 1;
  for(var i = 0; i < 26; i++) {
    if((bitMask & normWord) === bitMask) denormWord.push(String.fromCharCode((i < 18)?i+97:i+98));
    bitMask = bitMask<<1;
  }
  return denormWord;
}