import React, { useState } from 'react';
import axios from "axios";
import './ClaimButton.css'

const ClaimButton = ({ selectedUser, onClaim }) => {
  const [lastClaim, setLastClaim] = useState(null);

  const handleClaim = async () => {
    if (!selectedUser) return alert("Please select a user first");

    try {
      const res = await axios.post(`http://localhost:3000/api/claim/${selectedUser}`);
      setLastClaim(res.data); // Save the response
      if (onClaim) onClaim(); // Notify parent to refresh ClaimHistory
    } catch (err) {
      console.error("Error claiming points:", err);
    }
  };

  return (
       <div className="claim-button-wrapper">
      <h3>Claim Points</h3>
      <button onClick={handleClaim}>Claim Points</button>

      {lastClaim && (
        <p>
          <strong>{lastClaim.user.username}</strong> claimed <strong>{lastClaim.pointsClaimed}</strong> points!
        </p>
      )}
    </div>
  );
};

export default ClaimButton;
