import React, { useContext, useState, useEffect } from 'react'
import { auth, googleProvider } from '../Firebase'
import { useHistory } from 'react-router-dom'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState()

  useEffect(_ => {
    auth.getRedirectResult()
    .then(res => {
      console.log(res)
      if (res.user) {
        console.log("I'm pushing")
        setCurrentUser(res.user)
        history.push('/')
      }
    })

    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
      if (currentUser) {
        console.log("I'm pushing")
        history.push('/')
      }
    })

    return unsubscribe
  }, [])

  const loginWithGoogle = _ => {
    return auth.signInWithRedirect(googleProvider)
  }

  const signOut = _ => {
    return auth.signOut()
  }

  const value = {
    loading,
    currentUser,
    loginWithGoogle,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
