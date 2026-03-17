import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await registerUser(name, email, password);
    const token = generateToken(user.id);

    res.status(201).json({ message: "User registered successfully", user, token });
  } catch (error: any) {
    console.error("Register error:", error);
    res.status(500).json({ message: error.message || "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await loginUser(email, password);
    const token = generateToken(user.id);

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(401).json({ message: error.message || "Login failed" });
  }
};