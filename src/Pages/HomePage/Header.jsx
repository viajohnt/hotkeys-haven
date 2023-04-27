import React from "react"
import mouseTrapLogo from "../../assets/mousetraplogo.png"
import { Link, useMatch } from "react-router-dom"

export default function Header({ currentUser, onHandleLogout }) {
  const gameMatch = useMatch("/game")
  const allShortcutsMatch = useMatch("/allshortcuts")

  return (
    <>
      <header className="header flex justify-between items-center bg-zinc-900 text-white py-4 px-16 absolute top-0 right-0 left-0 w-[100vw]">
        <div className="header-logo z-10">
          <Link to="/">
            <img
              src={mouseTrapLogo}
              alt="mouselogo"
              className="logo-mouse max-h-[4rem]"
            />
          </Link>
        </div>
        <div className="header-title flex flex-col items-center absolute ml-10 pl-[3.8rem]">
          <h1 className="m-0 text-5xl font-bold whitespace-nowrap underline text-violet-300">
            Hotkeys Haven
          </h1>
          <div className="header-subtitle text-2xl mt-2 text-violet-300">
            <small className="italic">Mice are for cowards.</small>
          </div>
        </div>
        <nav className="navbar-list z-10 text-xl">
          <ul className="flex space-x-10 translate-x-40">
            <li>
              <Link
                to="/game"
                className={`font-bold ${gameMatch ? "underline" : ""}`}
              >
                Play Now
              </Link>
            </li>
            <li>
              <Link
                to="/allshortcuts"
                className={`font-bold ${allShortcutsMatch ? "underline" : ""}`}
              >
                All Shortcuts
              </Link>
            </li>
          </ul>
        </nav>
      <div className="header-content max-w-[15rem]">
        {currentUser ? (
          <div className="flex flex-col">
            <h3 className="currentuser h-16 ml-8 translate-y-[.5rem] translate-x-[-.5rem] text-xl text-emerald-400">Welcome, {currentUser}</h3>
            <button
              onClick={onHandleLogout}
              className="signout-button translate-y-[-1rem] translate-x-[.5rem] font-chakra-petch rounded-md border border-transparent px-2 py-1 text-base font-medium text-white bg-zinc-800 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500border hover:border-indigo-300  focus-visible:outline-[4px] focus-visible:ring-[auto] focus-visible:ring-opacity-50 focus-visible:ring-indigo-500 hover:translate-y-[-10px] transition-all duration-300 ease-out"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <h3 className="currentuser h-16 ml-8 mb-2 translate-y-[.5rem] translate-x-[-.9rem] text-xl text-rose-400">Please Login!</h3>
            <div>
              <Link to="/register">
                <button className="signup-button font-chakra-petch mr-4 rounded-md border border-transparent px-2 py-1 text-base font-medium text-white bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500border hover:border-indigo-300  focus-visible:outline-[4px] focus-visible:ring-[auto] focus-visible:ring-opacity-50 focus-visible:ring-indigo-500 hover:translate-y-[-10px] transition-all duration-300 ease-out">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="signin-button font-chakra-petch rounded-md border border-transparent px-2 py-1 text-base font-medium text-white bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500border hover:border-indigo-300  focus-visible:outline-[4px] focus-visible:ring-[auto] focus-visible:ring-opacity-50 focus-visible:ring-indigo-500 hover:translate-y-[-10px] transition-all duration-300 ease-out">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
    </>
  )
}
