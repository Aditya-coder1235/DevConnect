const User = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

async function signupUser(req, res) {
    try {
        let { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, Email and Password in required!" });
        }

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists!" });
        }

        let hashPassword = await bcrypt.hash(password, 13);

        const newUser = new User({ name, email, password: hashPassword });

        await newUser.save()

        res.status(201).json({ message: "User Signup!" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}


async function loginUser(req, res) {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Name, Email and Password in required!" });
        }

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        let isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(401).json({ message: "Invalid Password!" });
        }

        let token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 2 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "User Login!", user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileComplete:user.profileCompleted
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}


async function logoutUser(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 2 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "User Logout!" });


    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}


module.exports = { signupUser, loginUser, logoutUser }