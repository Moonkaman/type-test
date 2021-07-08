import {useState, useEffect} from 'react'

export default function useTimer() {
    const [currentTime, setCurrentTime] = useState(0)
    const [timerRunning, setTimerRunning] = useState(false)

    const startTimer = _ => {
        if (!timerRunning) {
            setCurrentTime(0)
            setTimerRunning(true)
        }
    }

    const stopTimer = _ => {
        setTimerRunning(false)
    }

    useEffect(_ => {
        let interval = null; 

        if (timerRunning) {
            interval = setInterval(_ => {
                setCurrentTime(prevTime => prevTime + 10)
            }, 10)
        } else {
            clearInterval(interval)
        }

        return  _ => clearInterval(interval)
    }, [timerRunning])

    return {
        currentTime,
        startTimer,
        stopTimer,
        timerRunning
    }
}
