const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const isAuth = require('../middleware/auth.middleware');

router.post('/complete', isAuth, userController.completeProfile);
router.get('/getProfile', isAuth, userController.getProfile);

module.exports = router;