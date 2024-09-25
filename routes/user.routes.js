import express from 'express';
import * as user from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add-to-favourite', isAuthenticated, user.addfavourite);
router.delete('/remove-from-favourite', isAuthenticated, user.removeFromfavourite);
router.get('/get-user-favourite', isAuthenticated, user.getUserfavourite);

export default router;
