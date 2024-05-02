import express from 'express';
import { register, login, createUser, getAllUsers, updateUser, deleteUser, updateAll,bulkUpdate } from '../controller/users.js';
import { checkAuth } from '../middleware/auth.js'
const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/', checkAuth('add_user'), createUser)
router.get('/', checkAuth('get_users'), getAllUsers)
// functionality to update many users with same data.
router.put('/update-all', checkAuth('update_all_users'), updateAll)

//to update many users with different data.
router.put('/bulk-update', checkAuth('update_bulk_users'), bulkUpdate)
router.put('/:id', checkAuth('edit_user'), updateUser)
router.delete('/:id', checkAuth('remove_user'), deleteUser)

export default router;
