import React, { useContext } from 'react'
import {db, Timestamp} from '../Firebase'

const DataContext = React.createContext()

export function useData() {
  return useContext(DataContext)
}

export function DataProvider({children}) {
  const subscribeToHighScores = (handleUpdate) => {
    return db.collection("HighScores").orderBy("WPM").limit(20).onSnapshot(collection => {
      handleUpdate(collection)
    })
  }

  const createHighScore = (scoreDetails, user) => {
    db.collection("HighScores").add({
      WPM: scoreDetails.wpm,
      Accuracy: scoreDetails.accuracy,
      userName: user.displayName,
      uid: user.uid,
      time: Timestamp.now()
    })
  }

  const value = {
    subscribeToHighScores,
    createHighScore
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}
