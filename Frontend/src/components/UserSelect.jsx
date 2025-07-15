import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserSelect.css'; // Import the CSS

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
    <div className="user-select-container">
      <h2 className="title">👤 Select or Add User</h2>

      <select
        className="user-dropdown"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">-- Select a User --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <div className="add-user-section">
        <input
          type="text"
          value={newUser}
          placeholder="Enter new user name"
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button onClick={handleAddUser}>➕ Add User</button>
      </div>
    </div>
  );
};

export default UserSelect;
