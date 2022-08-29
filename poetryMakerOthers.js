function setUserPoem() {
    let text = document.getElementById("poemSubmission").value.replace(/[\r\n]/gm, ' ');

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
  corpse,
  numLines,
  wordsInLine = Math.floor(Math.random() * 20) || 1
) {
  let corpseChop = generateWordPairs(corpse);
  let poemHolder = ``;
  for (let i = 0; i < numLines; i++) {
    if (i === 0) {
      poemHolder = writeLine(corpseChop, wordsInLine) + ";";
    } else if (i < numLines - 1) {
      poemHolder += `
        ${writeLine(corpseChop, wordsInLine) + ";"}`;
    } else {
      poemHolder += `
      ${writeLine(corpseChop, wordsInLine) + "."}`;
    }
  }
  return poemHolder;
}
let poem2 = document.querySelector("#poemText2");
let poemTitle2 = document.querySelector("#poemTitle2");

  poem2.innerText = BOOK_OF_BAD_POETRY(text, 14, 10);
  poemTitle2.innerText = BOOK_OF_BAD_POETRY(
    text,
    1,
    Math.ceil(Math.random() * 3)
  ).slice(0, -1);
}