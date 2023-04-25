import React from "react";
import mouseTrapLogo from "../../assets/mousetraplogo.png";
import { Link } from "react-router-dom";

export default function Header({ currentUser, onHandleLogout }) {
  return (
    <header className="header flex justify-between items-center bg-zinc-900 text-white py-4 px-16 absolute top-0 right-0 left-0">
      <div className="header-logo">
        <Link to="/">
          <img
            src={mouseTrapLogo}
            alt="mouselogo"
            className="logo-mouse max-h-[4rem]"
          />
        </Link>
      </div>
      <div className="header-title flex flex-col items-center absolute ml-10 pl-[3.8rem]">
        <h1 className="m-0 text-5xl font-bold whitespace-nowrap underline">
          Hotkeys Haven
        </h1>
        <div className="header-subtitle text-2xl mt-2">
          <small>Mice are for cowards.</small>
        </div>
      </div>
      <nav className="navbar absolute top-1/2 right-[30rem] transform -translate-y-1/2 text-1xl font-bold"></nav>
      <div className="header-content max-w-[15rem]">
        {currentUser ? (
          <div className="flex flex-col">
            <h3 className="currentuser h-16 ml-8 translate-y-[.5rem] translate-x-[-.5rem] text-xl">Welcome {currentUser}</h3>
            <button
              onClick={onHandleLogout}
              className="signout-button translate-y-[-1rem] translate-x-[.5rem] font-chakra-petch rounded-md border border-transparent px-2 py-1 text-base font-medium text-white bg-zinc-800 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500border hover:border-indigo-300  focus-visible:outline-[4px] focus-visible:ring-[auto] focus-visible:ring-opacity-50 focus-visible:ring-indigo-500"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <h3 className="currentuser h-16 ml-8 mb-2 translate-y-[.5rem] translate-x-[-.9rem] text-xl">Please Login!</h3>
            <div>
              <Link to="/register">
                <button className="signup-button font-chakra-petch mr-4 rounded-md border border-transparent px-2 py-1 text-base font-medium text-white bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500border hover:border-indigo-300  focus-visible:outline-[4px] focus-visible:ring-[auto] focus-visible:ring-opacity-50 focus-visible:ring-indigo-500">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="signin-button font-chakra-petch rounded-md border border-transparent px-2 py-1 text-base font-medium text-white bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500border hover:border-indigo-300  focus-visible:outline-[4px] focus-visible:ring-[auto] focus-visible:ring-opacity-50 focus-visible:ring-indigo-500">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
