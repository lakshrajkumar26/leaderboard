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
   const [claimTrigger, setClaimTrigger] = useState(false) // for  refetch the historypage auto

  return (
  <>
  <Homepage/>
  <UserSelect selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
  <ClaimButton selectedUser={selectedUser} onClaim={()=> setClaimTrigger( prev => !prev)}/>
  <Leaderboard/>
  <ClaimHistory selectedUser={selectedUser} claimTrigger={claimTrigger} />
  </>
  )
}

export default App
