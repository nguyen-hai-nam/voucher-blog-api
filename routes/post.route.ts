import express from 'express';

import postController from '../controllers/post.controller';
import { isAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/count', isAuth, postController.countPosts);
router.get('/', isAuth, postController.getAllPosts);
router.post('/', isAuth, postController.createPost);
router.get('/:id', isAuth, postController.getPostById);
router.patch('/:id', isAuth, postController.updatePostById);
router.delete('/:id', isAuth, postController.deletePostById);

export default router;
