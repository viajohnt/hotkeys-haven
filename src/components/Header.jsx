import React from "react";
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import vscodeLogo from '../assets/vscodeiconpng.png'
import tailwindLogo from '../assets/tailwind.png'
import profileLogo from '../assets/profile.png'

export default function Header(){
    return (
            <header className= "header" >
                <h1 className="project-title">Hotkeys Haven</h1>
                <div className ="powered-by">
                <h2 id="powered-by-text">Powered by: </h2>
                    <a href="https://vitejs.dev" target="_blank">
                        <img src={viteLogo} className="logo-vite" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo-react" alt="React logo" />
                    </a>
                    <a href="https://code.visualstudio.com/" target="_blank">
                        <img  src={vscodeLogo} className="logo-vscode" alt="vscode logo" />
                    </a>
                    <a href="https://tailwindcss.com/" target="_blank">
                        <img  src={tailwindLogo} className="logo-tailwind" alt="tailwind logo" />
                    </a>
                    <a href="https://www.linkedin.com/in/john-truong-665225197/" target="_blank">
                        <img  src={profileLogo} className="logo-profile" alt="profile logo" />
                    </a>
                </div>
            </header>
    )
}