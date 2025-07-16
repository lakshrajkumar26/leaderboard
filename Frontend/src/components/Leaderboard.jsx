import React, { useEffect, useState, useRef } from 'react';
import socket from '../socket';
import axios from "axios";
import { motion } from 'framer-motion';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import './Leaderboard.css';
import medalGold from '../assets/1st-prize.png';
import medalSilver from '../assets/2nd-place.png';
import medalBronze from '../assets/3rd-place.png';

const badgeColors = [
  '#FFD700', // Gold
  '#C0C0C0', // Silver
  '#CD7F32', // Bronze
];

const badgeLabels = [
  'Gold Champion',
  'Silver Champion',
  'Bronze Champion',
];

const medalImages = [medalGold, medalSilver, medalBronze];
const medalLabels = ['1st', '2nd', '3rd'];

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const prevRanksRef = useRef({});
  const lastMovementsRef = useRef({});
  const prevTopThreeRef = useRef([]);

  useEffect(() => {
    const fetchInitialLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/leaderboard");
        updateLeaderboardWithMovement(res.data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };

    fetchInitialLeaderboard();
    socket.on("leaderboardUpdate", updateLeaderboardWithMovement);

    return () => {
      socket.off("leaderboardUpdate");
    };
  }, []);

  const updateLeaderboardWithMovement = (newData) => {
    const prevRanks = prevRanksRef.current;
    const lastMovements = lastMovementsRef.current;
    const prevTopThree = prevTopThreeRef.current.map(user => user._id);

    const updated = newData.map((user) => {
      const prevRank = prevRanks[user._id];
      let movement = "same";
      if (prevRank) {
        if (user.rank < prevRank) movement = "up";
        else if (user.rank > prevRank) movement = "down";
      }
      lastMovements[user._id] = movement !== "same" ? movement : lastMovements[user._id] || "same";

      prevRanks[user._id] = user.rank;
      return {
        ...user,
        movement: lastMovements[user._id]
      };
    });

    const newTopThree = newData.filter(u => u.rank <= 3);
    newTopThree.forEach((user) => {
      if (!prevTopThree.includes(user._id)) {
        user.enteredTopThree = true;
      }
    });

    prevTopThreeRef.current = newTopThree;
    setLeaderboard(updated);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderChampionBlock = (user, rank) => {
    const badgeColor = badgeColors[rank - 1];
    const badgeLabel = badgeLabels[rank - 1];
    const scale = rank === 1 ? 1.18 : rank === 2 ? 1.08 : 1.04;
    const positionClass = rank === 1 ? "rank-1" : rank === 2 ? "rank-2" : "rank-3";
    return (
      <motion.div
        key={user._id}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0, scale }}
        whileHover={{ scale: scale + 0.05, boxShadow: `0 0 24px 6px ${badgeColor}` }}
        transition={{ duration: 0.6, type: 'spring' }}
        className={`champion-card ${positionClass}`}
        style={{ borderRadius: 18, background: 'rgba(255,255,255,0.92)', boxShadow: `0 0 32px 0 ${badgeColor}55` }}
      >
        <Tooltip title={badgeLabel} placement="top">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            badgeContent={<EmojiEventsIcon style={{ color: badgeColor, fontSize: 32, filter: 'drop-shadow(0 0 6px ' + badgeColor + ')' }} />}
          >
            <Avatar
              variant="square"
              sx={{
                width: 72,
                height: 72,
                fontSize: 32,
                fontWeight: 700,
                bgcolor: '#222',
                color: badgeColor,
                border: `3px solid ${badgeColor}`,
                boxShadow: `0 0 16px 2px ${badgeColor}99`,
                margin: '0 auto',
                mb: 1,
              }}
            >
              {getInitials(user.name)}
            </Avatar>
          </Badge>
        </Tooltip>
        {/* Medal icon and label below avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 6, marginBottom: 2 }}>
          <img src={medalImages[rank-1]} alt={medalLabels[rank-1] + ' medal'} style={{ width: 38, height: 38, marginBottom: 2 }} />
          <span style={{ fontWeight: 700, color: badgeColor, fontSize: '1rem', marginTop: 0 }}>{medalLabels[rank-1]}</span>
        </div>
        <div className="user-name" style={{ color: '#222', fontWeight: 700, fontSize: '1.1rem', marginTop: 8 }}>{user.name}</div>
        <div className="user-points" style={{ color: badgeColor, fontWeight: 700, fontSize: '1.05rem' }}>{user.totalPoints} pts</div>
      </motion.div>
    );
  };

  const renderOtherPlayers = () => {
    return (
      <div className="other-players">
        {leaderboard
          .filter(user => user.rank > 3)
          .sort((a, b) => a.rank - b.rank)
          .map(user => (
            <motion.div
              key={user._id}
              className="other-player-row"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 16px 2px #38bdf8' }}
              transition={{ duration: 0.4, type: 'spring' }}
            >
              <span className="rank">#{user.rank}</span>
              <span className="name">{user.name}</span>
              <span className="points">{user.totalPoints} pts</span>
              <span className="movement">
                {user.movement === 'up' && <ArrowUpwardIcon style={{ color: '#00ff73' }} />}
                {user.movement === 'down' && <ArrowDownwardIcon style={{ color: '#ff4d4d' }} />}
              </span>
            </motion.div>
          ))}
      </div>
    );
  };

  return (
    <Card className="theme-card leaderboard-card" sx={{ maxWidth: 700, margin: '2.5rem auto', padding: '2.5rem 2rem', borderRadius: 6, boxShadow: '0 8px 32px rgba(0,0,0,0.28)' }}>
      <motion.h2 className="leaderboard-heading" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: 'spring' }}>
        🏆 Top Champions
      </motion.h2>
      <div className="top-three-container" style={{ justifyContent: 'center', gap: '3.5rem', marginBottom: '2.5rem' }}>
        {leaderboard
          .filter(user => user.rank <= 3)
          .sort((a, b) => a.rank - b.rank)
          .map(user => renderChampionBlock(user, user.rank))}
      </div>
      {renderOtherPlayers()}
    </Card>
  );
};

export default Leaderboard;
