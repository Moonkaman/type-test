import React, { useState, useEffect, useRef } from 'react'
import { convertText, calculateScore, checkWordSoFar } from '../utils/TypeTestFunctions'
import { Card, FormControl, ListGroup } from 'react-bootstrap'

import { useAuth } from '../contexts/AuthContext'
import { useData } from '../contexts/DataContext'

import ResultsCard from '../components/ResultsCard';

import useTimer from '../hooks/useTimer';

export default function TestView() {

  const [inputText, setInputText] = useState("")
  const [wordBank, setWordBank] = useState([])
  const [typedWordBank, setTypedWordBank] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentWordError, setCurrentWordError] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [results, setResults] = useState(null)

  const {currentTime, startTimer, stopTimer, timerRunning} = useTimer()

  const textInput = useRef(null)

  const {currentUser} = useAuth()
  const {createHighScore} = useData()

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

  useEffect(_ => {
    if (results) {
      createHighScore(results, currentUser)
    }
  }, [results])

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
      textInput.current.focus()
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
            <FormControl ref={textInput} className={`${currentWordError && "wrong-word"}`} disabled={completed} type="text" value={inputText} onChange={handleChange} placeholder={completed ? "" : wordBank[currentWordIndex]} />
          </Card.Body>
        </Card>
        {results && <ResultsCard results={results} restart={handleRestart} />}
      </>
    )
}
