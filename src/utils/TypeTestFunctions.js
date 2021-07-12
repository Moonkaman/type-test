const convertText = text => {
  const textArray = text.split(" ")
  return textArray
} 

const calculateScore = (wordBank, typedWordBank, timeInMili) => {
  const seconds = timeInMili / 1000
  const minutes = seconds / 60
  //let wpm = Math.floor(((numOfChars/5)-numOfErrors) / minutes)

  const chars = calculateChars(wordBank)
  const errors = calculateErrors(wordBank, typedWordBank)

  let wpm = Math.floor(((chars/5)-errors) / minutes)
  let accuracy = calculateAccuracy(chars, errors)

  if (wpm < 0) {
    wpm = 0
  }

  return {
    accuracy,
    wpm,
    time: seconds,
    characters: chars,
    errors
  }
}

const calculateAccuracy = (numOfChars, numOfErrors) => {
  console.log(`noc: ${numOfChars} - noe: ${numOfErrors}`)
  return (numOfChars - numOfErrors) / numOfChars * 100
}

const calculateErrors = (wordBank, typedWordBank) => {
  let errors = 0
  
  wordBank.forEach((word, index) => {
    if (word !== typedWordBank[index]) {
      for(let letter = 0; letter < word.length; letter++) {
        if (word[letter] !== typedWordBank[index][letter]) {
          errors += 1
        }
      }
    }
  })

  return errors
}

const calculateChars = (wordBank) => {
  let chars = 0

  for (let i = 0; i < wordBank.length; i++) {
    chars += wordBank[i].length
  }

  return chars
}

const checkWordSoFar = (word, typedWord) => {
  for (let i = 0; i < typedWord.length; i++) {
    if (typedWord[i] !== " " && typedWord[i] !== word[i]) {
      return true
    }
  }
  return false
}

export {
  convertText,
  calculateScore,
  checkWordSoFar
}