import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './components/HomePage'
import UserSelect from './components/UserSelect'
import ClaimButton from './components/ClaimButton'
import Leaderboard from './components/Leaderboard'
import ClaimHistory from './components/ClaimHistory'
import bgVideo from './assets/background.mp4';

function App() {
  const [selectedUser, setSelectedUser] = useState("");
   const [claimTrigger, setClaimTrigger] = useState(false) // for  refetch the historypage auto

  return (
    <>
      {/* Video background. To remove and use the image background instead, comment out or delete this <video> block. */}
     
      <div className="container">
  
  <UserSelect selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
  <ClaimButton selectedUser={selectedUser} onClaim={()=> setClaimTrigger( prev => !prev)}/>
  <Leaderboard/>
  <ClaimHistory selectedUser={selectedUser} claimTrigger={claimTrigger} />
  </div>
  </>
  )
}

export default App
