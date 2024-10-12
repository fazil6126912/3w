const User = require('../models/userModel');
const History = require('../models/historyModel');

exports.getUsers = async (req, res) => {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
};

exports.addUser = async (req, res) => {
    const { name } = req.body;
    const newUser = new User({ name });
    await newUser.save();
    res.json(newUser);
};

exports.claimPoints = async (req, res) => {
    const { userId } = req.body;
    const randomPoints = Math.floor(Math.random() * 10) + 1;
    const user = await User.findById(userId);

    if (user) {
        user.totalPoints += randomPoints;
        await user.save();

        const history = new History({ userId: user._id, points: randomPoints });
        await history.save();

        // Emit the updated leaderboard
        req.io.emit('leaderboardUpdated');

        res.json({ user, randomPoints });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

exports.remove = async (req, res) => {
    const { userId } = req.body;

    try {
        // Set userRemoved to 1 for the given user
        await User.findByIdAndUpdate(userId, { userRemoved: 1 });
        res.status(200).json({ message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing user', error });
    }
};

exports.getHistory = async (req, res) => {
    const history = await History.find().populate('userId').sort({ createdAt: -1 });
    res.json(history);
};
