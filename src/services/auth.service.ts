import bcrypt from "bcrypt";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userRepo.create({
    name,
    email,
    password: hashedPassword
  });

  return await userRepo.save(user);
};

export const loginUser = async (
  email: string,
  password: string
) => {

  const user = await userRepo.findOneBy({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Invalid credentials");
  }

  return user;
};