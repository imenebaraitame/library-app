import experess from 'express';
import {
    //signupUser, 
    //loginUser,
    getUsers,  
    addUser
} from '../controllers/userControllers.js';
const router = experess.Router();

// router.post('/signup', signupUser);
// router.post('/login', loginUser);
router.get('/', getUsers);
router.post('/', addUser);



export default router;
