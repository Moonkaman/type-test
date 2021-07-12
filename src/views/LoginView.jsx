import React, {useEffect} from 'react'
import {useAuth} from '../contexts/AuthContext'
import {Card, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useHistory } from 'react-router'

export default function LoginView() {
  const { loginWithGoogle, currentUser } = useAuth()
  const history = useHistory()

  useEffect(_ => {
    console.log(currentUser)
  }, [])

  const handleLogin = _ => {
    loginWithGoogle()
    .then(_ => {
      history.push('/')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="login-view-container">
      <Card className="login-card">
        <Card.Body>
          <Card.Title>Sign In</Card.Title>
          <Button onClick={handleLogin}>Sign in with Google <FontAwesomeIcon icon={faGoogle} /> </Button>
        </Card.Body>
      </Card>
    </div>
  )
}
