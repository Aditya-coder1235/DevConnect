const User = require('../models/user.model');


async function completeProfile(req, res) {
    try {
        const { avatar, bio, skills, github, portfolio, experienceLevel, role } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized!" });
        }

        user.avatar = avatar;
        user.bio = bio;
        user.skills = skills;
        user.github = github;
        user.portfolio = portfolio;
        user.experienceLevel = experienceLevel;
        user.role = role;

        user.profileCompleted = true

        await user.save();

        return res.status(200).json({
            message: "Profile completed successfully",
            user,
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error!" });
    }
}


async function getProfile(req, res) {
    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized!" });
        }

        res.status(200).json({ message: "user profile fetch!", user });

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}

async function updateProfile(req, res) {
    try {

        const { avatar, bio, skills, github, portfolio, experienceLevel, role } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized!" });
        }

        if (avatar) user.avatar = avatar;
        if (bio) user.bio = bio;
        if (skills) user.skills = skills;
        if (github) user.github = github;
        if (portfolio) user.portfolio = portfolio;
        if (experienceLevel) user.experienceLevel = experienceLevel;
        if (role) user.role = role;

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}

async function deleteAccount(req, res) {
    try {

        // const { password } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized!" });
        }

        // const isMatch = await bcrypt.compare(password, user.password);

        // if (!isMatch) {
        //     return res.status(400).json({ message: "Invalid Password!" });
        // }

        await user.deleteOne();

        res.status(200).json({
            message: "Account deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}

module.exports = { completeProfile, getProfile , updateProfile, deleteAccount}