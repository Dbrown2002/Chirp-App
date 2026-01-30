import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";


const router = express.Router();

// Check endpoint doesn't need arcjet protection - it's called frequently
router.get("/check", protectRoute, (req, res) => {
    res.status(200).json(req.user);
});

// Apply arcjet protection to sensitive routes
router.post("/signup", arcjetProtection, signup);
router.post("/login", arcjetProtection, login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);


export default router;
