import React, { useState, useEffect } from 'react'
import shortcutsData from '../../shortcuts.json'
import Timer from '../../Pages/TrainerPage/Timer'
import FavoriteShortcut from '../../Pages/TrainerPage/FavoriteShortcut'

const Trainer = () => {
  const [currentShortcut, setCurrentShortcut] = useState(null)
  const [pressedKeys, setPressedKeys] = useState(new Set())
  const [userInput, setUserInput] = useState('')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameStarted, setGameStarted] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(true)

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (gameStarted && timeLeft === 0) {
      endGame()
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
    
      if (
        currentShortcut &&
        userInput === currentShortcut.shortcut &&
        pressedKeys.size === 0
      ) {
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

  const updateHighScore = () => {
    if (score > highScore) {
      setHighScore(score)
    }
  }

  const startGame = () => {
    setGameStarted(true)
    setCurrentShortcut(shortcutsData.shortcuts[Math.floor(Math.random() * shortcutsData.shortcuts.length)])
  }

  const resetGame = () => {
    setCurrentShortcut(null)
    setPressedKeys(new Set())
    setUserInput('')
    setScore(0)
    setTimeLeft(60)
    setGameStarted(false)
    setHasPlayed(true)
    setGameEnded(false)
  }

  const endGame = () => {
    setGameStarted(false)
    updateHighScore()
    setHasPlayed(true)
    setGameEnded(true)
  }

  const keyName = (key) => {
    const keyMapping = {
      'ControlLeft': 'Control',
      'ControlRight': 'Control',
      'ShiftLeft': '⇧',
      'ShiftRight': '⇧',
      'MetaLeft': '⌘',
      'MetaRight': '⌘',
      'Slash': '/',
      'BracketRight': "]",
      'BracketLeft': "[",
      'AltLeft': '⌥',
      'AltRight': '⌥',
      'ArrowUp': 'UpArrow',
      'ArrowDown': 'DownArrow',
      'ArrowLeft': 'LeftArrow',
      'ArrowRight': 'RightArrow',
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

  const inputStyle = {
    textAlign: 'center',
    '::placeholder': {
      textAlign: 'center',
      fontSize : '10px',
    },
  }

  const handleToggleFavorite = (shortcut, isFavorite) => {
    if (isFavorite) {
      setFavorites((prevFavorites) => [...prevFavorites, shortcut])
    } else {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item.id !== shortcut.id)
      )
    }
  }

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites)
  }

  return (
    <div tabIndex="0" className="game-container translate-x-[45rem] translate-y-[15rem]">
      <div className='highscore text-3xl translate-y-[-5rem] translate-x-[-6.5rem] text-pink-400'>High Score: {highScore}</div>
      <div className='score text-4xl translate-x-[-4.8rem] translate-y-[-2.5rem] text-amber-300'>Score: {score}</div>
      <div className='timeleft text-3xl translate-x-[28rem] translate-y-[-9.7rem] text-fuchsia-300'>Time Left:</div>
      <Timer timeLeft={timeLeft} />
      <div className='best-container translate-x-[-11.5rem] translate-y-[-18.5rem] text-2xl flex flex-col items-center justify-center'>
      <button
        onClick={toggleFavorites}
        className="toggle-favorites-button text-small translate-x-[-33rem] translate-y-[20rem] font-chakra-petch rounded-md border border-transparent px-2 py-1 text-bold font-medium text-slate-500 bg-violet-300 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500border hover:border-indigo-300 focus-visible:outline-[4px] focus-visible:ring-[auto] focus-visible:ring-opacity-50 focus-visible:ring-indigo-500"
      >
        {showFavorites ? 'Hide Favorites' : 'Show Favorites'}
      </button>
      <h2 className='fav-title-text text-3xl fixed top-[-12.2rem] left-[-30rem] text-sky-400'>Favorited Shortcuts:</h2>
      {showFavorites && (
        <div className="favorites-list fixed top-[-12rem] left-[-30rem] text-xl mt-[3.5rem]">

          <ul className='key-list text-cyan-300'>
            {favorites.map((favorite) => (
              <li key={favorite.id} >
                {favorite.description} ({favorite.shortcut})
              </li>
            ))}
          </ul>
        </div>
      )}
        {!gameStarted && !hasPlayed && !gameEnded && (
        <button
          onClick={startGame}
          className="start-game-button translate-x-[1.5rem] font-chakra-petch rounded-md border border-transparent px-2 py-1 text-bold font-medium text-slate-500 bg-emerald-300 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500border hover:border-indigo-300 focus-visible:outline-[4px] focus-visible:ring-[auto] focus-visible:ring-opacity-50 focus-visible:ring-indigo-500 hover:translate-y-[-10px] transition-all duration-300 ease-out">
          Start
        </button>
        )}
              <div className="favorite">
        {gameStarted && currentShortcut && (
          <div className="action-container flex flex-col items-center whitespace-nowrap translate-y-[-5rem] translate-x-[1.5rem]">
            <div className="action-text-container w-[300px] flex justify-center items-center ">
              <p>Action: {currentShortcut.description}</p>
            </div>
            {currentShortcut && (
              <div className="current-shortcut translate-y-[1rem]">
                <FavoriteShortcut
                  shortcut={currentShortcut}
                  isFavorite={favorites.some((fav) => fav.id === currentShortcut.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
            )}
            <input
              type="text"
              value={userInput}
              readOnly
              placeholder=""
              className="input-field mt-[2rem] w-64 h-12"
              style={inputStyle}
            />
          </div>
        )}
      </div>
      {(!gameStarted || (gameStarted && !currentShortcut)) && hasPlayed && !gameEnded && (
        <div>
          <button
            onClick={() => {
              resetGame()
              startGame()
            }}
            className="reset-game-button translate-x-[1.5rem] font-chakra-petch rounded-md border border-transparent px-2 py-1 text-bold font-medium text-slate-500 bg-cyan-400 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500border hover:border-indigo-300 focus-visible:outline-[4px] focus-visible:ring-[auto] focus-visible:ring-opacity-50 focus-visible:ring-indigo-500 hover:translate-y-[-10px] transition-all duration-300 ease-out">
            Play Again
          </button>
        </div>
      )}
  
      {gameEnded && (
        <div>
          <button
            onClick={() => {
              resetGame()
              startGame()
            }}
            className="reset-game-button translate-x-[1.5rem] font-chakra-petch rounded-md border border-transparent px-2 py-1 text-bold font-medium text-slate-500 bg-cyan-400 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500border hover:border-indigo-300 focus-visible:outline-[4px] focus-visible:ring-[auto] focus-visible:ring-opacity-50 focus-visible:ring-indigo-500 hover:translate-y-[-10px] transition-all duration-300 ease-out">
            Play Again
          </button>
        </div>
      )}
      {gameStarted && (
        <div className="reset-button-container w-full flex justify-center">
        <button
          onClick={resetGame}
          className="reset-game-button mt-[1rem] translate-x-[1.5rem] font-chakra-petch rounded-md border border-transparent px-2 py-1 text-bold font-medium text-slate-500 bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500border hover:border-indigo-300 focus-visible:outline-[4px] focus-visible:ring-[auto] focus-visible:ring-opacity-50 focus-visible:ring-indigo-500">
          Reset Game
        </button>
      </div>
      )}
      </div>
      </div>
  )
}

export default Trainer
   
