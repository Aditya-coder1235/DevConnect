const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const isAuth = require('../middleware/auth.middleware');

router.post('/complete', isAuth, userController.completeProfile);
router.get('/getProfile', isAuth, userController.getProfile);
router.put("/update", isAuth, userController.updateProfile)
router.delete("/delete", isAuth, userController.deleteAccount);
router.get('/getAllProfile', userController.getAllProfile);
router.post("/follow/:id", isAuth, userController.followUser);
router.post("/unfollow/:id", isAuth, userController.unfollowUser);
router.get("/followers/:id", userController.getFollowerList);

module.exports = router;