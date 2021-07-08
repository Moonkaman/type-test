import React from 'react'
import {Card, FormControl, ListGroup, Button} from 'react-bootstrap'

export default function ResultsCard({results, restart}) {
  return (
  <Card className="results-card">
    <Card.Body>
      <Card.Title>Results</Card.Title>
      <ListGroup>
        <ListGroup.Item>{results.wpm} WPM</ListGroup.Item>
        <ListGroup.Item>{results.accuracy}% Accuracy</ListGroup.Item>
        <ListGroup.Item>{results.time} Seconds</ListGroup.Item>
        <ListGroup.Item>{results.characters - results.errors} / {results.characters} Correct</ListGroup.Item>
      </ListGroup>
      <Button size="lg" className="w-100 mt-3" onClick={restart}>Try again</Button>
    </Card.Body>
  </Card>
  )
}
