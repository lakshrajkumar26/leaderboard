import React, { useEffect, useState } from 'react';
import socket from '../socket';
import axios from "axios";
import './Leaderboard.css'; // 👈 import the CSS

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchInitialLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/leaderboard");
        setLeaderboard(res.data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };

    fetchInitialLeaderboard();

    socket.on("leaderboardUpdate", (data) => {
      setLeaderboard(data);
    });

    return () => {
      socket.off("leaderboardUpdate");
    };
  }, []);

  const getBadge = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  const getRowClass = (rank) => {
    if (rank === 1) return "gold-row";
    if (rank === 2) return "silver-row";
    if (rank === 3) return "bronze-row";
    return "";
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
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user) => (
            <tr key={user._id} className={getRowClass(user.rank)}>
              <td>{getBadge(user.rank)}</td>
              <td className="user-cell">
                <div className="avatar">{getInitials(user.name)}</div>
                <span>{user.name}</span>
              </td>
              <td>{user.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
