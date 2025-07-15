import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './components/HomePage'
import UserSelect from './components/UserSelect'
import ClaimButton from './components/ClaimButton'
import Leaderboard from './components/Leaderboard'
import ClaimHistory from './components/ClaimHistory'

function App() {
  const [selectedUser, setSelectedUser] = useState("");

  return (
  <>
  <Homepage/>
  <UserSelect selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
  <ClaimButton selectedUser={selectedUser}/>
  <Leaderboard/>
  <ClaimHistory selectedUser={selectedUser}/>
  </>
  )
}

export default App
