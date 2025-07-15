import React, { useEffect, useState } from 'react';
import socket from '../socket';
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {

     const fetchInitialLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/leaderboard"); // first render 
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

  return (
    <div>
      <h3>🏆 Leaderboard</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user) => (
            <tr key={user._id}>
              <td>{user.rank}</td>
              <td>{user.name}</td>
              <td>{user.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
