import { useState, useEffect } from 'react';

import './App.css';

import useTimer from './hooks/useTimer';

const convertText = text => {
  const textArray = text.split(" ")
  return textArray.map(word => {
    return {
      word,
      typed: false,
      correct: false
    }
  })
} 

const calculateWPM = (numOfChars, numOfErrors,timeInMili) => {
  const seconds = timeInMili / 1000
  const minutes = seconds / 60
  let wpm = Math.floor(((numOfChars/5)-numOfErrors) / minutes)

  if (wpm < 0) {
    wpm = 0
  }

  return wpm
}

const calculateAccuracy = (numOfChars, numOfErrors) => {
  console.log(`noc: ${numOfChars} - noe: ${numOfErrors}`)
  return (numOfChars - numOfErrors) / numOfChars * 100
}

const calculateErrors = (word, typedWord) => {
  let errors = 0
  for (let i = 0; i < word.length; i++) {
    if (word[i] !== typedWord[i]) {
      errors += 1
    }
  }

  return errors
}

const checkWordSoFar = (word, typedWord) => {
  for (let i = 0; i < typedWord.length; i++) {
    if (typedWord[i] !== " " && typedWord[i] !== word[i]) {
      return true
    }
  }
  return false
}

function App() {



  const {currentTime, startTimer, stopTimer} = useTimer()

  const handleChange = e => {
    startTimer()
    setInputText(e.target.value)
  }

  if (text.length <= 0) {
    return <div></div>
  }

  return (
    <div className="App">
      <p>{
          text.map((wordObj, index) => {
            const {word} = wordObj
            const stylingClasses = `${index === currentWord ? "current-word"  : ""} ${wordObj.typed && wordObj.correct ? "correct" : ""} ${wordObj.typed && !wordObj.correct ? "incorrect" : ""}`

            if (index === text.length-1) {
              return <span key={index} className={stylingClasses}>{word}</span>
            }
            else {
              return <span key={index} className={stylingClasses}>{`${word} `}</span>
            }
          })
        }</p>
      <input className={`${currentWordWrong && "wrong-word"}`} disabled={completed} type="text" value={inputText} onChange={handleChange} placeholder={completed ? "" : text[currentWord].word} />
    </div>
  );
}

export default App;
