var long_list = [];  /* This contains the list of words from the file. */
var short_list = []; /* This contians the shortened list of words. */

/**
 * This code handles the file input. It is triggered by the "run-button".
 * This function loads the provided word list and then strips out any words with an "s", is less than four letters, or contains more than seven different letters.
 */
function run() {
  
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
  long_list = e.target.result.split("\n");
  
  prune();
  output();
}

function prune() {
  
  console.log("Word list pruning started.");
  
  for(var i = 0; i < long_list.length; i++) {
    if(long_list[i].length > 3 && !long_list[i].includes('s') && countLetters(long_list[i]) < 8) short_list.push(long_list[i]);
  }
  
  console.log("Word list pruning complete.");
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
 * This outputs the list of words. Since I am still learning JavaScript, this is the best way I know how to do it.
 */
function output() {
  
  console.log("Output started.");

/*  var outputStr = "";
  
  for(var i = 0; i < short_list.length; i++) {
    outputStr += short_list[i] + '<br/>';
  }
  
  document.getElementById("word-list").innerHTML = outputStr;
  
  document.getElementById("memo").innerHTML = "Long list length: " + long_list.length + " Short list length: " + short_list.length;
  */
  var newWindow = window.open("about:blank", "output", "_blank");
  console.log(short_list.join('\n'));
  if(newWindow) newWindow.document.write(short_list.join('\n'));
  console.log("Output completed.");
}