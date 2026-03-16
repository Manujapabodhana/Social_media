import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {

  const { name, email, password } = req.body;

  const user = await registerUser(name, email, password);

  const token = generateToken(user.id);

  res.json({ user, token });
};

export const login = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const user = await loginUser(email, password);

  const token = generateToken(user.id);

  res.json({ user, token });
};