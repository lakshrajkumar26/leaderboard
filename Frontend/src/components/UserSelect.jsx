import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { motion } from 'framer-motion';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import './UserSelect.css';

const UserSelect = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data.Allusers);
      } catch (err) {
        console.error('Fetch users error:', err);
      }
    };

    fetchData();
  }, []);

  const handleAddUser = async () => {
    if (!newUser.trim()) return alert('Please enter a valid name.');
    try {
      const res = await axios.post('http://localhost:3000/api/create', {
        name: newUser,
        totalPoints: 0,
      });

      setUsers([...users, res.data.newUser]);
      setNewUser('');
    } catch (err) {
      console.error('Add user error', err);
      if (err.response?.status === 409) {
        alert('User with this name already exists.');
      } else {
        alert('Something went wrong while adding user.');
      }
    }
  };

  return (
    <Card className="theme-card user-select-container" sx={{ maxWidth: 700, margin: '2.5rem auto', padding: '2.5rem 2rem', borderRadius: 6, boxShadow: '0 8px 32px rgba(0,0,0,0.28)' }}>
      <motion.h2 className="title" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: 'spring' }}>
        <span role="img" aria-label="user">👤</span> Select or Add User
      </motion.h2>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="user-select-label" sx={{ color: '#facc15', fontWeight: 700 }}>Select a User</InputLabel>
        <Select
          labelId="user-select-label"
          value={selectedUser}
          label="Select a User"
          onChange={(e) => setSelectedUser(e.target.value)}
          sx={{
            bgcolor: 'rgba(255,255,255,0.85)',
            borderRadius: 2,
            fontWeight: 600,
            color: '#222',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#facc15',
              boxShadow: '0 0 8px 2px #facc15',
            },
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 5 + 8, // 5 items at 48px each + padding
                overflowY: 'auto',
              },
            },
          }}
        >
          <MenuItem value="">-- Select a User --</MenuItem>
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id} sx={{ fontWeight: 600 }}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <motion.div className="add-user-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: 'spring', delay: 0.2 }}>
        <TextField
          value={newUser}
          placeholder="Enter new user name"
          onChange={(e) => setNewUser(e.target.value)}
          variant="outlined"
          sx={{
            bgcolor: 'rgba(255,255,255,0.85)',
            borderRadius: 2,
            width: '60%',
            mr: 2,
            '& .MuiOutlinedInput-root': {
              fontWeight: 600,
              color: '#222',
              borderRadius: 2,
              '&.Mui-focused fieldset': {
                borderColor: '#facc15',
                boxShadow: '0 0 8px 2px #facc15',
              },
            },
          }}
        />
        <motion.div whileHover={{ scale: 1.08, boxShadow: '0 0 16px 2px #10b981' }}>
          <Button
            variant="contained"
            startIcon={<PersonAddAltIcon />}
            onClick={handleAddUser}
            sx={{
              bgcolor: '#10b981',
              color: 'white',
              fontWeight: 700,
              borderRadius: 2,
              px: 3,
              py: 1.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              '&:hover': {
                bgcolor: '#059669',
                boxShadow: '0 0 16px 2px #10b981',
                transform: 'scale(1.08)',
              },
            }}
          >
            Add User
          </Button>
        </motion.div>
      </motion.div>
    </Card>
  );
};

export default UserSelect;
