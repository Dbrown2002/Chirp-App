import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";


    
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Validation
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        // Validate email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        // Save user to database
        await newUser.save();

        // Generate token
        generateToken(newUser._id, res);

        // Send welcome email (don't wait for it to complete)
        sendWelcomeEmail(newUser.email, newUser.fullName, process.env.CLIENT_URL).catch(emailError => {
            console.error("Failed to send welcome email:", emailError);
        });

        // Send response
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePicture: newUser.profilePicture,
        });

    } catch (error) {
        console.error("Error during user signup:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Generate token
        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture,
        });

    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const logout = (_, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        console.error("Error during user logout:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkAuth controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile = async (req, res) =>  {

    try {
    const {profilePicture } = req.body;

    if (!profilePicture) {
        return res.status(400).json({ message: "Profile picture URL is required." });

    }

    const userId = req.user._id;
    
    const uploadResponse = await cloudinary.uploader.upload(profilePicture)
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePicture:uploadResponse.secure_url },
        { new: true }
    ).select('-password');

    res.status(200).json(updatedUser);

    } catch (error) {
        console.error("Error updating profile picture:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }


};
