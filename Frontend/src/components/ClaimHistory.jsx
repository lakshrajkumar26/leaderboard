import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ClaimHistory.css';

const ClaimHistory = ({ selectedUser, claimTrigger }) => {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchPaginatedHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/history/${selectedUser}?page=${page}&limit=5`
        );
        setHistory(res.data.history);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Pagination fetch error:', err);
      }
    };

    fetchPaginatedHistory();
  }, [selectedUser, page, claimTrigger]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="history-wrapper">
      <h2 className="history-title">🧾 Claim History</h2>

      {!selectedUser ? (
        <p className="history-empty">Please select a user to view history.</p>
      ) : history.length === 0 ? (
        <p className="history-empty">No history found for this user.</p>
      ) : (
        <>
          <ul className="history-list">
            {history.map((item) => (
              <li key={item._id} className="history-card">
                <div className="card-header">
                  <span className="username">{item.userName}</span>
                  <span className="points">+{item.pointsClaimed}</span>
                </div>
                <div className="card-footer">
                  Total: <span className="total">{item.totalPoints}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="pagination">
            <button onClick={handlePrev} disabled={page === 1}>◀ Prev</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={handleNext} disabled={page === totalPages}>Next ▶</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClaimHistory;
