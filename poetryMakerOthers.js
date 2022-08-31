function setUserPoem() {

  let text = document
    .getElementById("poemSubmission")
    .value.replaceAll(/[\n\r]/g, " ")
    .replaceAll(/[.,\/#!$%\^&\*;:{}=_~()]/g, "").replaceAll(/\s{2,}/g, " ");
  // text.replaceAll(/[\n\r]/g, " ");
  // text.replaceAll(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  // text.replaceAll(/\s{2,}/g, " ");
  $('#createYourOwnPoemHolder').css('border', '5px outset tan');
  function generateWordPairs(text) {
    let keyValPair = text.toLowerCase().replaceAll(",", "").split(" ");
    for (let i = 0; i < keyValPair.length; i++) {
      keyValPair[i] = Array.of(keyValPair[i]);
      if (keyValPair[i + 1] !== undefined) {
        keyValPair[i].push(keyValPair[i + 1]);
      }
    }
    let wordPairObj = {};
    for (let j = 0; j < keyValPair.length; j++) {
      if (keyValPair[j + 1] !== undefined) {
        if (!Array.isArray(wordPairObj[`${keyValPair[j][0]}`])) {
          wordPairObj[keyValPair[j][0]] = [keyValPair[j][1]];
        } else {
          wordPairObj[`${keyValPair[j][0]}`].push(keyValPair[j][1]);
        }
      }
    }
    return wordPairObj;
  }

  function writeLine(poemChain, senLen) {
    let poemLine = "";
    function wordSelector(chainArr) {
      let word = chainArr[Math.floor(Math.random() * chainArr.length)];
      return word;
    }
    for (let i = 0; i < senLen; i++) {
      let nextWord;
      let prevWord = wordSelector(
        poemChain[
          `${
            Object.keys(poemChain)[
              Math.floor(Math.random() * Object.keys(poemChain).length)
            ]
          }`
        ]
      );
      poemLine += " ";
      if (i % 6 === 2) {
        nextWord = wordSelector(
          poemChain[
            `${
              Object.keys(poemChain)[
                Math.floor(Math.random() * Object.keys(poemChain).length)
              ]
            }`
          ]
        );
      } else {
        try {Math.floor(Math.random() * poemChain[prevWord].length);}
        catch {setUserPoem()}
        const fate = Math.floor(Math.random() * poemChain[prevWord].length);
        nextWord = poemChain[prevWord][fate];
        while (prevWord === nextWord) {
          const unsealedFate = Math.floor(
            Math.random() * poemChain[prevWord].length
          );
          nextWord = poemChain[prevWord][unsealedFate];
        }
        prevWord = nextWord;
    }
      poemLine += nextWord;
    }
    return poemLine.trim();
  }

  function BOOK_OF_BAD_POETRY(
    text,
    numLines,
    wordsInLine = Math.floor(Math.random() * 20) || 1
  ) {
    let textChop = generateWordPairs(text);
    let poemHolder = ``;
    for (let i = 0; i < numLines; i++) {
      if (i === 0) {
        poemHolder = writeLine(textChop, wordsInLine) + ";";
      } else if (i < numLines - 1) {
        poemHolder += `
          ${writeLine(textChop, wordsInLine) + ";"}`;
      } else {
        poemHolder += `
        ${writeLine(textChop, wordsInLine) + "."}`;
      }
    }
    return poemHolder;
  }
  let poem2 = document.querySelector("#poemText2");
  let poemTitle2 = document.querySelector("#poemTitle2");
if (text.length === 0) {
  poemTitle2.innerText = ''
  poem2.innerText = `You know... It would help if you gave me something to work with. 
  A master cannot create without their tools!`
  $('#poemText2').css('font-size', '6vh');
} else if (text.length < 20) {
  poemTitle2.innerText = ''
  poem2.innerText = `Apologies! Please enter a poem of greater length!
  Anything over twenty words should do.`
  $('#poemText2').css('font-size', '6vh');
} else{
  $('#poemText2').css('font-size', '3vh');
  poem2.innerText = BOOK_OF_BAD_POETRY(text, 14, 10);
  poemTitle2.innerText = BOOK_OF_BAD_POETRY(
    text,
    1,
    Math.ceil(Math.random() * 4)
  ).slice(0, -1);
}
}
