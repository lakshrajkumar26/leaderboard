import React, { useEffect, useState, useRef } from 'react';
import socket from '../socket';
import axios from "axios";
import './Leaderboard.css'; // 🖌️ Custom animations here
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const prevRanksRef = useRef({}); // 🔁 store previous ranks
  const lastMovementsRef = useRef({}); // 🧠 store last movement type
  const prevTopThreeRef = useRef([]); // ⭐ track previous top 3

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

    socket.on("leaderboardUpdate", (data) => {
      updateLeaderboardWithMovement(data);
    });

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

    // Detect changes in top 3
    const newTopThree = newData.filter(u => u.rank <= 3);
    newTopThree.forEach((user) => {
      if (!prevTopThree.includes(user._id)) {
        user.enteredTopThree = true;
        if (user.rank === 1) user.specialFirst = true;
        if (user.rank === 2 || user.rank === 3) user.specialTopThree = true;
      }
    });

    prevTopThreeRef.current = newTopThree;
    setLeaderboard(updated);
  };

  const getBadge = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  const getRowClass = (user) => {
    let base = "leaderboard-row";
    if (user.rank === 1) base += " gold-row";
    if (user.rank === 2) base += " silver-row";
    if (user.rank === 3) base += " bronze-row";
    if (user.movement === "up") base += " rank-up";
    if (user.movement === "down") base += " rank-down";
    if (user.enteredTopThree) base += " entered-top-three";
    if (user.specialFirst) base += " crown-entry";
    if (user.specialTopThree) base += " top-three-entry";
    return base;
  };

  const getArrow = (movement) => {
    if (movement === "up") return <ArrowUpwardIcon  style={{ color: '#00ff73' }}/>; 
    if (movement === "down") return <ArrowDownwardIcon style={{ color: '#ff4d4d' }}/>;
    return "➖";
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 Live Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Total Points</th>
            <th>Movement</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user) => (
            <tr key={user._id} className={getRowClass(user)}>
              <td>{getBadge(user.rank)}</td>
              <td className="user-cell">
                <div className="avatar">{getInitials(user.name)}</div>
                <span>{user.name}</span>
              </td>
              <td>{user.totalPoints}</td>
              <td className="movement">{getArrow(user.movement)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
