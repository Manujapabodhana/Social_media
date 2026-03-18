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

export const updatePostService = async (
  postId: number,
  userId: number,
  title?: string,
  content?: string
) => {
  const post = await postRepo.findOne({
    where: { id: postId },
    relations: ["user"],
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (!post.user || post.user.id !== userId) {
    throw new Error("Not authorized to update this post");
  }

  if (title !== undefined) {
    post.title = title;
  }

  if (content !== undefined) {
    post.content = content;
  }

  return await postRepo.save(post);
};

export const deletePostService = async (postId: number, userId: number) => {
  const post = await postRepo.findOne({
    where: { id: postId },
    relations: ["user"],
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (!post.user || post.user.id !== userId) {
    throw new Error("Not authorized to delete this post");
  }

  await postRepo.remove(post);
};