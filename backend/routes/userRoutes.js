const express = require('express');
const { getUsers, addUser, claimPoints, getHistory } = require('../controllers/userController');
const router = express.Router();

router.get('/users', getUsers);
router.post('/users', addUser);
router.post('/claim', claimPoints);
router.get('/history', getHistory);

module.exports = router;
