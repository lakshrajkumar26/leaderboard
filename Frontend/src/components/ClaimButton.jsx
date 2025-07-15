import React from 'react'
import { useState } from 'react';
import axios from "axios";

const ClaimButton = ({ selectedUser }) => {

    const [lastClaim, setLastClaim] = useState(null);

   const handleClaim = () => {
   if(!selectedUser) return alert("Please Select a user First");
   
   try{
    const res = axios.post(`http://localhost:3000/api/claim/${selectedUser}`,);
    setLastClaim(res.data);
   }
   catch (err){
    console.log("error in claim Points",err)
   }
}
    return(<>
        <div>ClaimButton
        <button onClick={handleClaim}>Claim Points</button>
        {lastClaim && (
            <p>
                {lastClaim.user.username} claimed {lastClaim.pointsClaimed} points!
            </p>
        )}
        </div>
    </>
    )
}

export default ClaimButton