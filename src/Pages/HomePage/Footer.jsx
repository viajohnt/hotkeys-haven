import React, {useEffect, useState} from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '../../assets/vite.svg'
import vscodeLogo from '../../assets/vscodeiconpng.png'
import tailwindLogo from '../../assets/tailwind.png'
import profileLogo from '../../assets/profile.png'

export default function Footer(){
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
    
    return(
        <footer className="footer flex flex-col justify-center items-center bg-zinc-900 text-white fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full h-12 py-10">
        <div className="powered-by flex justify-center items-center gap-4 mb-1">
            <h2 id="powered-by-text" className="text-sm mt-1 mr-3">Powered by: </h2>
            <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo-vite max-w-[20rem] max-h-[20rem] hover:filter-hover hover:translate-y-[-10px] transition-all duration-300 ease-out" alt="vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo-react max-w-[10rem] max-h-[10rem] hover:filter-hover hover:translate-y-[-10px] transition-all duration-300 ease-out" alt="react logo" />
            </a>
            <a href="https://code.visualstudio.com/" target="_blank">
            <img src={vscodeLogo} className="logo-vscode mt-[10rem] max-w-[10rem] max-h-[3rem] mx-auto hover:filter-hover hover:translate-y-[-10px] transition-all duration-300 ease-out" alt="vscode logo" />
            </a>
            <a href="https://tailwindcss.com/" target="_blank">
            <img src={tailwindLogo} className="logo-tailwind max-w-[3rem] max-h-[3rem] hover:filter-hover hover:translate-y-[-10px] transition-all duration-300 ease-out" alt="tailwind logo" />
            </a>
            <a href="https://www.linkedin.com/in/john-truong-665225197/" target="_blank">
            <img src={profileLogo} className="logo-profile max-w-[2.5rem] max-h-[2.5rem] hover:filter-hover hover:translate-y-[-10px] transition-all duration-300 ease-out" alt="profile logo" />
            </a>
        </div>
        <div>
            <button onClick={toggleFullScreen} className="fixed bottom-5 right-4 rounded-md border border-transparent px-3 py-2 text-base font-medium text-white bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:border-indigo-300 focus-visible:outline-[4px] focus-visible:ring-[auto] focus-visible:ring-opacity-50 focus-visible:ring-indigo-500 hover:translate-y-[-10px] transition-all duration-300 ease-out">
            {fullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
        </div>
        </footer>
    )
}