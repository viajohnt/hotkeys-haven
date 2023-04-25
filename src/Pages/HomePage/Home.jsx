import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Home({currentUser, setCurrentUser, onHandleLogout}) {
  const [users, setUsers] = useState([])

  useEffect(() =>{
    fetch("http://localhost:3000/users")
    .then (res => res.json())
    .then (data => setUsers(data))
  },[])

  
  return (
    <>
      <Header setCurrentUser={setCurrentUser} currentUser = {currentUser} onHandleLogout={onHandleLogout} />
      <Footer />

    </>
  );
}

