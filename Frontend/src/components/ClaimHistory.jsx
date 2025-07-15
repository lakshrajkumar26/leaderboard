import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClaimHistory = ({ selectedUser , claimTrigger}) => {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);               // current page
  const [totalPages, setTotalPages] = useState(1);   // total pages from backend

  useEffect(() => {
    if (!selectedUser) return;

    const fetchPaginatedHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/history/${selectedUser}?page=${page}&limit=5`);
        setHistory(res.data.history);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Pagination fetch error:", err);
      }
    };

    fetchPaginatedHistory();
  }, [selectedUser, page, claimTrigger]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div>
      <h3> Claim History</h3>
      {!selectedUser ? (
        <p>Please select a user to view history.</p>
      ) : history.length === 0 ? (
        <p>No history found for this user.</p>
      ) : (
        <>
          <ul>
            {history.map((item) => (
              <li key={item._id}>
                {item.userName} claimed <strong>{item.pointsClaimed}</strong> points — Total after claim: <strong>{item.totalPoints}</strong>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 10 }}>
            <button onClick={handlePrev} disabled={page === 1}>
              Prev
            </button>
            <span style={{ margin: '0 10px' }}>
              Page {page} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClaimHistory;
