import React from 'react';
import '../App.css'; // Create a separate CSS file for Leaderboard if needed

const Leaderboard = ({ users, onRemoveUser }) => {
    return (
        <div className="leaderboard">
            <div className="leaderboard-header">Leaderboard</div>
            <ul className="leaderboard-list">
                {users
                    .sort((a, b) => b.totalPoints - a.totalPoints)
                    .map((user, index) => (
                        <li key={user._id} className="leaderboard-item">
                            <span className="rank">{index + 1}.</span> {user.name} - {user.totalPoints} Points
                            {/* Add the delete button */}
                            <button onClick={() => onRemoveUser(user._id)} className="delete-button">d</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
