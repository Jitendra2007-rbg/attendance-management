import React from 'react'
import Navbar from '../layouts/Navbar'
import Home from '../section/Home'

const MainScreen = ({ sections }) => {
  return (
    <div>
      <Navbar sections={sections} />
      <Home sections={sections} />
    </div>
  )
}

export default MainScreen