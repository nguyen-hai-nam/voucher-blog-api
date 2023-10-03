import express from 'express';

import PostController from '../controllers/post.controller';
import { isAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/count', isAuth, PostController.countPosts);
router.get('/', isAuth, PostController.getAllPosts);
router.post('/', isAuth, PostController.createPost);
router.get('/:id', isAuth, PostController.getPostById);
router.patch('/:id', isAuth, PostController.updatePostById);
router.delete('/:id', isAuth, PostController.deletePostById);

export default router;
