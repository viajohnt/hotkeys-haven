import { useState, useCallback, useEffect } from 'react'
import './App.css'
import Header from './components/Header'

function App() {
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
  }, []);
  
  const toggleFullScreen = () => {
    if (fullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };
  
  return (
    <>
      <Header />
      <div>
        <button onClick={toggleFullScreen} id ="fullscreen-button">
          {fullScreen ? 'Exit FullScreen' : 'FullScreen'}
        </button>
      </div>
      
    </>
  );
}

export default App

