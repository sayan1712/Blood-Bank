const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModels');
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');
//Register new user
router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({
            email: req.body.email
        });
        if (userExists) {
            return res.send({
                success: false,
                message: "User Already Exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const user = new User(req.body);
        await user.save();

        return res.send({
            success: true,
            message: "User Registerd Successsfully",
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});
//Login user
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: "User not found",
            });
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid Password",
            });
        }
        

        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: "7d" })

        return res.send({
            success: true,
            message: "User logged in successfully",
            data: token
        });

    }
    catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});
// get current user
router.get("/get-Current-User", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });

        // user.password = undefined;
        return res.send({
            success: true,
            message: "User fetched successfully",
            data: user,
        });

    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;