import React from 'react';
import '../App.css'; // Import the CSS file

const UserList = ({ users, onSelectUser }) => {
    return (
        <div className="user-list-container">
            <select onChange={(e) => onSelectUser(e.target.value)} className="user-input">
                <option value="">Select a User</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default UserList;
