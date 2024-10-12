import React, { useState } from 'react';
import '../App.css'; // Import the CSS file

const AddUserForm = ({ onUserAdded }) => {
    const [userName, setUserName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userName) {
            await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: userName }),
            });
            setUserName('');
            onUserAdded(); // Fetch updated users
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-user-form">
            <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Add User"
                className="user-input"
                required
            />
            <button type="submit" className="add-user-button ">Add User</button>
        </form>
    );
};

export default AddUserForm;
