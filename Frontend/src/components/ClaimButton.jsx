import React, { useState } from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
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
    <Card className="theme-card claim-button-wrapper" sx={{ maxWidth: 700, margin: '2.5rem auto', padding: '2.5rem 2rem', borderRadius: 6, boxShadow: '0 8px 32px rgba(0,0,0,0.28)' }}>
      <motion.h3 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: 'spring' }} style={{ color: '#facc15', fontWeight: 700, fontSize: '1.5rem', marginBottom: 24 }}>
        <EmojiEventsIcon sx={{ color: '#facc15', mr: 1, fontSize: 32, verticalAlign: 'middle' }} />
        Claim Points
      </motion.h3>
      <motion.div
        whileHover={{ scale: 1.08, boxShadow: '0 0 16px 2px #10b981' }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring', delay: 0.2 }}
        style={{ display: 'inline-block' }}
      >
        <Button
          variant="contained"
          onClick={handleClaim}
          sx={{
            bgcolor: '#10b981',
            color: 'white',
            fontWeight: 700,
            borderRadius: 2,
            px: 4,
            py: 1.7,
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            '&:hover': {
              bgcolor: '#059669',
              boxShadow: '0 0 16px 2px #10b981',
              transform: 'scale(1.08)',
            },
            animation: 'pulse 1.5s infinite',
            '@keyframes pulse': {
              '0%': { boxShadow: '0 0 0 0 #10b98155' },
              '70%': { boxShadow: '0 0 16px 8px #10b98122' },
              '100%': { boxShadow: '0 0 0 0 #10b98155' },
            },
          }}
        >
          Claim Points
        </Button>
      </motion.div>
      {lastClaim && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: 24, fontSize: '1.1rem', color: '#10b981', fontWeight: 600 }}
        >
          <strong style={{ color: '#34d399' }}>{lastClaim.user.username}</strong> claimed <strong style={{ color: '#facc15' }}>{lastClaim.pointsClaimed}</strong> points!
        </motion.p>
      )}
    </Card>
  );
};

export default ClaimButton;
