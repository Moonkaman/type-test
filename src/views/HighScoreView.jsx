import React, { useState, useEffect } from 'react'
import { Table, Card } from 'react-bootstrap'
import { useData } from '../contexts/DataContext'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default function HighScoreView() {
  const {subscribeToHighScores} = useData()

  const [highScores, setHighScores] = useState([])

  useEffect(() => {
    const unsubscribe = subscribeToHighScores(collection => {
      const newHighScores = []
      collection.forEach(doc => {
        newHighScores.unshift(doc.data())
      })
      setHighScores(newHighScores)
    })
    return unsubscribe
  }, [])

  return (
    <Card className="high-score-card">
      <Card.Header>
        <Card.Title>
          Top 20 Scores
        </Card.Title>
      </Card.Header>
      <Card.Body>  
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>WPM</th>
              <th>Accuracy</th>
              <th>Date</th>
            </tr>
          </thead>
          {highScores.map((highScore, index) => {
            const dayjsObj = dayjs.unix(highScore.time.seconds)
            const formattedDate = dayjs(dayjsObj).fromNow()
            return (
              <tbody key={index}>
                <tr>
                  <td>{index}</td>
                  <td>{highScore.userName}</td>
                  <td>{highScore.WPM}</td>
                  <td>{highScore.Accuracy}</td>
                  <td>{formattedDate}</td>
                </tr>
              </tbody>
            )
          })}
        </Table>
      </Card.Body>
    </Card>
  )
}
