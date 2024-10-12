import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import UserList from './components/UserList';
import Leaderboard from './components/Leaderboard';
import AddUserForm from './components/AddUserForm';
import './App.css'; // Import the CSS file

const socket = io('http://localhost:5000');
const API_URL = process.env.B_URL;
const App = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();

        socket.on('leaderboardUpdated', () => {
            fetchUsers();
        });

        return () => socket.off('leaderboardUpdated');
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get(`${process.env.API_URL}/users`);
        setUsers(response.data);
    };

    // Function to remove a user by their id
    const removeUser = (userId) => {
        setUsers(users.filter(user => user._id !== userId));
    };

    const handleClaimPoints = async () => {
        if (selectedUser) {
            await axios.post(`${process.env.API_URL}/api/claim`, { userId: selectedUser });
        }
    };

    return (
        <div className="app-container">
            <h1>Leaderboard</h1>
            <AddUserForm onUserAdded={fetchUsers} />
            <div className="user-list">
                <UserList users={users} onSelectUser={setSelectedUser} />
                <button onClick={handleClaimPoints} className="claim-button">Claim Points</button>
            </div>
            {/* Pass the removeUser function to the Leaderboard */}
            <Leaderboard users={users} onRemoveUser={removeUser} />
        </div>
    );
};

export default App;
