import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom'
import React, {useState} from 'react';
import './index.css'
import Home  from './Pages/HomePage/Home'
import SignUpForm from './Pages/CreateLoginPage/SignUpForm';
import LoginForm from './Pages/CreateLoginPage/LoginForm';
import ErrorPage from './Pages/ErrorPage';
import Header from './Pages/HomePage/Header'
import Footer from './Pages/HomePage/Footer'
import Trainer from './Pages/TrainerPage/Trainer'


export default function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const Root = () => {
    return (
      <>
      <Header setCurrentUser={setCurrentUser} currentUser = {currentUser} onHandleLogout={handleLogout} /> 
      <div>
        <Outlet />
      </div>
      <Footer />
      </>
    )
  }
  
  function handleLogout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  }
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root/>}>
        <Route index element ={<Home />}/>
        <Route path="/register" element={<SignUpForm currentUser = {currentUser}  setCurrentUser={setCurrentUser} />}/>
        <Route path="/login" element={<LoginForm currentUser = {currentUser}  setCurrentUser={setCurrentUser} />}/>
        <Route path="/game" element={<Trainer />}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Route>
    )
  )
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}