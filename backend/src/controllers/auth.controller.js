import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({message: "All fields are required"})
        }
        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters"})
        }
        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({message: "Email already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPswd = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName: fullName,
            email: email,
            password:hashedPswd
        })

        if (newUser) {
            // generate jwt token
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        }
        else {
            res.status(400).json({message: "Invalid user data"})
        }

    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(300).json({message: "Internal Error"})
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if (!isCorrectPassword) {
            return res.status(400).json({message: "Invalid Credentials"})
        }
        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log("error in login controller", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        return res.status(200).json({message: "Logged out successfully"})
    }
    catch {
        console.log("Error in logout", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
};

export const updateProfile = (req, res) => {

}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in check Auth", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}