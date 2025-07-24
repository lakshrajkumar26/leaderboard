import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
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
    <Card className="history-wrapper" sx={{ maxWidth: 700, margin: '2.5rem auto', padding: '2.5rem 2rem', borderRadius: 6, boxShadow: '0 8px 32px rgba(0,0,0,0.28)' }}>
      <motion.h2 className="history-title" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: 'spring' }} style={{ color: '#38bdf8', fontWeight: 800, fontSize: '2rem', marginBottom: 24 }}>
        <ReceiptLongIcon sx={{ color: '#38bdf8', mr: 1, fontSize: 32, verticalAlign: 'middle' }} />
        Claim History
      </motion.h2>
      {!selectedUser ? (
        <motion.p className="history-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          Please select a user to view history.
        </motion.p>
      ) : history.length === 0 ? (
        <motion.p className="history-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          No history found for this user.
        </motion.p>
      ) : (
        <>
          <List className="history-list custom-scrollbar">
            {history.map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.03, boxShadow: '0 0 16px 2px #38bdf8' }}
                transition={{ duration: 0.4, type: 'spring', delay: idx * 0.07 }}
                style={{ marginBottom: 20, borderRadius: 16, background: 'rgba(30,32,36,0.98)', width: '100%' }}
              >
                <ListItem sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: 2, p: 2, width: '100%', justifyContent: 'space-between' }}>
                  <span className="username" style={{ color: '#facc15', fontWeight: 700, fontSize: '1.1rem', minWidth: 100 }}>{item.userName}</span>
                  <span className="points" style={{ color: '#10b981', fontWeight: 700, fontSize: '1.1rem', minWidth: 80, textAlign: 'center' }}>+{item.pointsClaimed}</span>
                  <span className="total" style={{ color: '#34d399', fontWeight: 700, fontSize: '1.1rem', minWidth: 100, textAlign: 'right' }}>Total: {item.totalPoints}</span>
                </ListItem>
              </motion.div>
            ))}
          </List>
          <div className="pagination" style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button onClick={handlePrev} disabled={page === 1} variant="contained" sx={{ bgcolor: '#38bdf8', color: 'white', borderRadius: 99, px: 3, fontWeight: 700, '&:hover': { bgcolor: '#2563eb', transform: 'scale(1.08)' } }}>◀ Prev</Button>
            <span style={{ color: '#222', fontWeight: 600 }}>Page {page} of {totalPages}</span>
            <Button onClick={handleNext} disabled={page === totalPages} variant="contained" sx={{ bgcolor: '#38bdf8', color: 'white', borderRadius: 99, px: 3, fontWeight: 700, '&:hover': { bgcolor: '#2563eb', transform: 'scale(1.08)' } }}>Next ▶</Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default ClaimHistory;
