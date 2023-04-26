import React, { useState, useEffect } from 'react'
import shortcutsData from '../../shortcuts.json'

const Trainer = () => {
  const [currentShortcut, setCurrentShortcut] = useState(null)
  const [pressedKeys, setPressedKeys] = useState(new Set())
  const [userInput, setUserInput] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setGameStarted(false)
    }
  }, [gameStarted, timeLeft])

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault()
      if (e.code === 'Enter') {
        nextShortcut()
      } else if (e.code === 'Backspace' || e.code === 'Delete') {
        setPressedKeys((prevState) => {
          const newSet = new Set(prevState)
          newSet.delete(Array.from(newSet).pop())
          return newSet
        })
      } else {
        setPressedKeys((prevState) => {
          const newSet = new Set(prevState)
          newSet.add(e.code)
          return newSet
        })
      }
    }

    const handleKeyUp = (e) => {
      e.preventDefault()
      setPressedKeys((prevState) => {
        const newSet = new Set(prevState)
        newSet.delete(e.code)
        return newSet
      })
      if (currentShortcut && userInput === currentShortcut.shortcut) {
        setScore((prevScore) => prevScore + 1)
        nextShortcut()
      }
    }
    if (gameStarted) {
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameStarted])


  useEffect(() => {
    setUserInput(Array.from(pressedKeys).map(keyName).join(' + '))
    if (currentShortcut?.shortcut && userInput === currentShortcut.shortcut) {
      setScore((prevScore) => prevScore + 1)
      nextShortcut()
    }
  }, [pressedKeys])

  const startGame = () => {
    setGameStarted(true)
    setCurrentShortcut(shortcutsData.shortcuts[Math.floor(Math.random() * shortcutsData.shortcuts.length)])
  }

  const resetGame = () => {
    setCurrentShortcut(null)
    setPressedKeys(new Set())
    setUserInput('')
    setScore(0)
    setTimeLeft(10)
    setGameStarted(false)
  }

  const keyName = (key) => {
    const keyMapping = {
      'ControlLeft': 'Control',
      'ControlRight': 'Control',
      'ShiftLeft': 'Shift',
      'ShiftRight': 'Shift',
      'MetaLeft': 'Meta',
      'MetaRight': 'Meta',
      'Slash': '/'
    }
    if (key.startsWith('Key')) {
      return key.slice(3)
    }
    return keyMapping[key] || key
  }

  const nextShortcut = () => {
    setPressedKeys(new Set())
    setUserInput('')
    setCurrentShortcut(shortcutsData.shortcuts[Math.floor(Math.random() * shortcutsData.shortcuts.length)])
  }
  
  return (
    <div tabIndex="0" className="fixed translate-x-[40rem] translate-y-[15rem]">
      <h1 id="game-container">Game Dontainer</h1>
      <p>Score: {score}</p>
      <p>Time Left: {timeLeft}</p>
      {!gameStarted && <button onClick={startGame} className="start-game-button font-chakra-petch rounded-md border border-transparent px-2 py-1 text-bold font-medium text-slate-500 bg-emerald-300 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500border hover:border-indigo-300  focus-visible:outline-[4px] focus-visible:ring-[auto] focus-visible:ring-opacity-50 focus-visible:ring-indigo-500 hover:translate-y-[-10px] transition-all duration-300 ease-out">
        Start</button>}
      {gameStarted && currentShortcut && (
        <div>
          <p>Action: {currentShortcut.description}</p>
          <input type="text" value={userInput} readOnly placeholder="Type your shortcut" onChange={(e)=> startGame(e.target.value)} />
        </div>
      )}
      {gameStarted && (
        <div>
          <button onClick={resetGame}className="reset-game-button font-chakra-petch rounded-md border border-transparent px-2 py-1 text-bold font-medium text-slate-500 bg-amber-300 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500border hover:border-indigo-300  focus-visible:outline-[4px] focus-visible:ring-[auto] focus-visible:ring-opacity-50 focus-visible:ring-indigo-500 hover:translate-y-[-10px] transition-all duration-300 ease-out">
            Reset Game</button>
        </div>
      )}
    </div>
  )
}
export default Trainer
