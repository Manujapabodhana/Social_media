import { AppDataSource } from "../config/database";
import { Post } from "../entities/Post";
import { User } from "../entities/User";

const postRepo = AppDataSource.getRepository(Post);
const userRepo = AppDataSource.getRepository(User);

export interface GetPostsQuery {
  page?: number;
  limit?: number;
  search?: string;
  userId?: number;
  title?: string;
}

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

export const getPostsService = async (query: GetPostsQuery = {}) => {
  const page = query.page && query.page > 0 ? query.page : 1;
  const limit = query.limit && query.limit > 0 ? Math.min(query.limit, 100) : 10;
  const skip = (page - 1) * limit;

  const qb = postRepo
    .createQueryBuilder("post")
    .leftJoinAndSelect("post.user", "user");

  // Search in title and content (case-insensitive)
  if (query.search) {
    qb.andWhere("(LOWER(post.title) LIKE LOWER(:search) OR LOWER(post.content) LIKE LOWER(:search))", {
      search: `%${query.search}%`,
    });
  }

  // Filter by userId
  if (query.userId) {
    qb.andWhere("user.id = :userId", { userId: query.userId });
  }

  // Filter by title
  if (query.title) {
    qb.andWhere("LOWER(post.title) LIKE LOWER(:title)", { title: `%${query.title}%` });
  }

  qb.orderBy("post.createdAt", "DESC");
  qb.skip(skip).take(limit);

  const [posts, total] = await qb.getManyAndCount();
  const totalPages = Math.ceil(total / limit);

  return {
    data: posts,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
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