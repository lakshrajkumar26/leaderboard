import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import UserSelect from './components/UserSelect'
import ClaimButton from './components/ClaimButton'
import Leaderboard from './components/Leaderboard'
import ClaimHistory from './components/ClaimHistory'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import About from './components/About'


function App() {
  const [selectedUser, setSelectedUser] = useState("");
  const [claimTrigger, setClaimTrigger] = useState(false) // for  refetch the historypage auto

  return (
    <BrowserRouter>
    <Navbar /> {/* ← Global navbar on all pages */}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/scoreboard' element={<Leaderboard />} />
     <Route path='/claimbutton' element={<ClaimHistory/>} />
     <Route path='/about' element={<About/>} />
     

      <Route path='/claimpoints' element={<>
        <UserSelect selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <ClaimButton selectedUser={selectedUser} onClaim={() => setClaimTrigger(prev => !prev)} />
        <Leaderboard />
        <ClaimHistory selectedUser={selectedUser} claimTrigger={claimTrigger} />
      </>} />
 </Routes>
    </BrowserRouter>
  )
}

export default App
