import express from 'express';
import UserController from '../controllers/user.controller';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.patch('/:id', UserController.updateUserById);
router.delete('/:id', UserController.deleteUserById);

export default router;
