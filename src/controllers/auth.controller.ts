import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwt";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

// @route   POST /api/v1/auth/register
// @desc    Register a new user
// @access  Public
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Store refresh token in database
    user.refreshToken = refreshToken;
    await userRepo.save(user);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(201).json({ 
      message: "User registered successfully", 
      user: userWithoutPassword, 
      accessToken, 
      refreshToken 
    });
  } catch (error: any) {
    console.error("Register error:", error);
    res.status(500).json({ message: error.message || "Registration failed" });
  }
};

// @route   POST /api/v1/auth/login
// @desc    Login user and generate tokens
// @access  Public
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Update refresh token in database
    user.refreshToken = refreshToken;
    await userRepo.save(user);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ 
      message: "Login successful", 
      user: userWithoutPassword, 
      accessToken, 
      refreshToken 
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(401).json({ message: error.message || "Login failed" });
  }
};

// @route   POST /api/v1/auth/refresh
// @desc    Refresh access token
// @access  Private
export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET!;
    const decoded: any = verifyToken(refreshToken, secret);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired refresh token" });
    }

    const user = await userRepo.findOneBy({ id: decoded.id });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    // Update refresh token for security/rotation
    user.refreshToken = newRefreshToken;
    await userRepo.save(user);

    res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error: any) {
    console.error("Refresh error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};