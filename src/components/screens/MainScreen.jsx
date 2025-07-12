import React from 'react'
import Navbar from '../main/Navbar'
import Home from '../main/Home'

const MainScreen = ({ sections }) => {
  return (
    <div>
      <Navbar sections={sections} />
      <Home sections={sections} />
    </div>
  )
}

export default MainScreen