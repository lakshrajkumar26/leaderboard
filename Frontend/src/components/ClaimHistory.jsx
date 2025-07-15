import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClaimHistory = ({ selectedUser }) => {
  const [history, setHistory] = useState([]);

  useEffect( () => {
    // const history = async() =>{

    // }
    const fetchHistory = async () => {
        if(!selectedUser) return;
      try {
        const res = await axios.get(`http://localhost:3000/api/history/${selectedUser}`);
        setHistory(res.data.history); // assuming backend sends { history: [...] }
        console.log(res.data.history);
      } catch (err) {
        console.error("History fetch error:", err);
      }
    };

    fetchHistory();
    
 }, [selectedUser]);
    // axios
    //   .get(`http://localhost:3000/api/claim/history/${selectedUser}`)
    //   .then((res) => setHistory(res.data.history))
    //   .catch((err) => console.error("History fetch error:", err));
 

  return (
    <div>
      <h3>📜 Claim History</h3>
      {!selectedUser ? (
        <p>Please select a user to view history.</p>
      ) : history.length === 0 ? (
        <p>No history found for this user.</p>
      ) : (
        <ul>
          {history.map((item, index) => (
            <li key={item._id}>
              {item.userName} claimed <strong>{item.pointsClaimed}</strong> points — Total after claim: <strong>{item.totalPoints}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClaimHistory;
