import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Home() {
  const [users, setUsers] = useState([])

  useEffect(() =>{
    fetch("http://localhost:3000/users")
    .then (res => res.json())
    .then (data => setUsers(data))
  },[])

  
  return (
    <>
      <h2 className='home-title font-bold text-3xl translate-y-[10rem] translate-x-[40rem] text-amber-300 '>Daily Affirmations:</h2>
      <p className='para-text1 translate-y-[17rem] translate-x-[4rem] text-yellow-100'>"Why do I have to be so slow at coding?" </p>
      <p className='para-text2 translate-y-[23rem] translate-x-[25rem] text-yellow-100'>"Is it even possible to turn in Phase-2 Project on time with these pathetic speeds?"</p>
      <p className='para-text3 translate-y-[36rem] translate-x-[58rem] text-yellow-100'>"100% of all losers use a mouse to code"</p>
      <p className='para-text4 translate-y-[8rem] pl-[75rem] text-yellow-100'>"Maybe its just me"</p>
      <p className='para-text5 translate-y-[26rem] translate-x-[12rem] text-yellow-100'>"If only I had a shortcut trainer..."</p>
    </>
  )
}

