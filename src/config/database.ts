import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Post } from '../entities/Post';
import { Comment } from '../entities/Comment';
import { Like } from '../entities/Like';
import { Share } from '../entities/Share';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'social_db',
  synchronize: true,
  entities: [User, Post, Comment, Like, Share],
});