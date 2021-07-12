import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'
import { Spinner } from 'react-bootstrap'

export default function PrivateRoute({component: Component, ...rest}) {
  const {currentUser, loading} = useAuth()

  if (loading) {
    return (
      <div style={{minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  return (
    <Route {...rest}
    render={props => {
      return currentUser ? <Component {...props} /> : <Redirect to="/login"/>
    }}/>
  )
}
