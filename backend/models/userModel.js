const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    totalPoints: { type: Number, default: 0 },
    userRemoved: { type: Number, default: 0 }  // Field to mark users as removed
});

module.exports = mongoose.model('User', userSchema);
