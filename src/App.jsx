import { useState, useEffect } from 'react';
import {Card, FormControl, ListGroup} from 'react-bootstrap'

import './App.css';
import ResultsCard from './components/ResultsCard';

import useTimer from './hooks/useTimer';

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

function App() {
  const [inputText, setInputText] = useState("")
  const [wordBank, setWordBank] = useState([])
  const [typedWordBank, setTypedWordBank] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentWordError, setCurrentWordError] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [results, setResults] = useState(null)

  const {currentTime, startTimer, stopTimer, timerRunning} = useTimer()


  useEffect(_ => {
    fetch('https://api.kanye.rest/')
    .then(res => res.json())
    .then(data => setWordBank(convertText(data.quote)))
  }, [])

  useEffect(_ => {
    const typedWord = inputText.slice(0, -1)
    const lastCharIsSpace = inputText[inputText.length-1] == " "

    setCurrentWordError(checkWordSoFar(wordBank[currentWordIndex], inputText))
    
    if (lastCharIsSpace) {
      setTypedWordBank([
        ...typedWordBank,
        typedWord
      ])
      setInputText("")
      setCurrentWordIndex(currentWordIndex + 1)
    }

    if (currentWordIndex === wordBank.length-1) {
      if (inputText === wordBank[currentWordIndex]) {
        setCompleted(true)
        setTypedWordBank([
          ...typedWordBank,
          inputText
        ])
        setInputText("")
      }
    }
  }, [inputText])

  useEffect(_ => {
    if (timerRunning) {
      if (typedWordBank.length === wordBank.length) {
        stopTimer()
        setResults(calculateScore(wordBank, typedWordBank, currentTime))
      }
    }
  }, [typedWordBank])

  const handleChange = e => {
    startTimer()
    setInputText(e.target.value)
  }

  const handleRestart = e => {
    fetch('https://api.kanye.rest/')
    .then(res => res.json())
    .then(data => {
      setTypedWordBank([])
      setInputText("")
      setCompleted(false)
      setCurrentWordIndex(0)
      setResults(null)
      setCurrentWordError(false)
      setWordBank(convertText(data.quote))
    })
    
  }

  if (wordBank.length <= 0) {
    return <div></div>
  }

  return (
    <>
      <Card className="main-card">
        <Card.Body>
          <p className="quote-text">{
              wordBank.map((word, index) => {
                const stylingClasses = `${index === currentWordIndex ? "current-word"  : ""} ${word === typedWordBank[index] ? "correct" : ""} ${typedWordBank[index] !== undefined && word !== typedWordBank[index] ? "incorrect" : ""}`

                if (index === wordBank.length-1) {
                  return <span key={index} className={stylingClasses}>{word}</span>
                }
                else {
                  return <span key={index} className={stylingClasses}>{`${word} `}</span>
                }
              })
            }</p>
          <FormControl className={`${currentWordError && "wrong-word"}`} disabled={completed} type="text" value={inputText} onChange={handleChange} placeholder={completed ? "" : wordBank[currentWordIndex]} />
        </Card.Body>
      </Card>
      {results && <ResultsCard results={results} restart={handleRestart} />}
    </>
  );
}

export default App;
