const combs = 7;          // The number of combs in the problem. I can make this a variable in future versions.

var words = [];           // This is a list of words to check if they are solutions to the puzzle.
var solutions = [];       // This is the set of solutions.
var solutionScores = [];  // This is the score for each solution.
var totalScore;

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

/**
 * This function loads the words from the file reader.
 */
function loadWords(e) {
  
  /* Split the intput into lines. Each line is it's own element of the array. */
  words = e.target.result.split("\n");
  
  document.getElementById("load-button").disabled = true;
  document.getElementById("run-button").disabled = false;
  console.log("Words loaded: " + words.length);
}

/**
 * This function turns a word (or set of letters) into a normalized form.
 */
function normalizedForm(word) {
  
  var returnInt = 0;
  var charArray = Array.from(new Set(word));
  charArray.sort();
  for(var i = 0; i < charArray.length; i++) returnInt = (returnInt | (2**(charArray[i].charCodeAt(0) - ((charArray[i].charCodeAt(0) > 115)?98:97))));
  
  return returnInt;
}

/**
 * This function scores a word.
 */
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

/**
 * This function runs the solver routine.
 *
 * Warning: The function does not do input validation. Use at your own risk.
 */
function run() {
  
  var remainder, center, a, b, c, d, e, f, i, score, normWord;
  
  totalScore = 0;
  
  center = normalizedForm(document.getElementById("center").value);
  a = normalizedForm(document.getElementById("r1").value);
  b = normalizedForm(document.getElementById("r2").value);
  c = normalizedForm(document.getElementById("r3").value);
  d = normalizedForm(document.getElementById("r4").value);
  e = normalizedForm(document.getElementById("r5").value);
  f = normalizedForm(document.getElementById("r6").value);
  
  remainder = a | b | c | d | e | f;
                 
  for(i = 0; i < words.length; i++) {
    normWord = normalizedForm(words[i]);
    if(((center & normWord) === center) && (((center | remainder) & normWord) === normWord)) {
      score = scoreWord(words[i]);
      totalScore += score;
      solutions.push(words[i]);
      solutionScores.push(score);
    }
  }
                
  output();
}

/**
 * Outputs the solutions and scores.
 */
function output() {
  var outString = "<table><tr><th>Solution</th><th>Score</th></tr>";
  
  for(var i = 0; i < solutions.length; i++) outString += "<tr><td>" + solutions[i] + "</td><td>" + solutionScores[i] + "</td></tr>";
  
  outString += "</table>";
  
  document.getElementById("output").innerHTML = outString;
  
  document.getElementById("memo").innerHTML = "Total Score: " + totalScore;
  
  
}