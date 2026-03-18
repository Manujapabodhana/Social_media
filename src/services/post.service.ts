import { AppDataSource } from "../config/database";
import { Post } from "../entities/Post";
import { User } from "../entities/User";

const postRepo = AppDataSource.getRepository(Post);
const userRepo = AppDataSource.getRepository(User);

export const createPostService = async (
  userId: number,
  title: string,
  content: string
) => {

  const user = await userRepo.findOneBy({ id: userId });

  if (!user) {
    throw new Error("User not found");
  }

  const post = postRepo.create({
    title,
    content,
    user
  });

  return await postRepo.save(post);
};

export const getPostsService = async () => {

  return await postRepo.find({
    relations: ["user"],
    order: { id: "DESC" }
  });

};