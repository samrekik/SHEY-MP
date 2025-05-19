import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  const {user}=useSelector((state)=>state.users)
  return (
    <div><h1>Bienvenue à la page d’accueil</h1>
    {user && <h1 className='text-2xl'>{user.name}</h1>}
    </div>
  )
}
