
const express = require('express');
const {register, login, getUserById,updateUser,deleteUser } = require('../controller/user');

const router = express.Router();


router.get('/getUser/:id_usuario', getUserById);
router.put('/updateUser/:id_usuario', updateUser);
router.delete('/deleteUser/:id_usuario', deleteUser);

// registro y login
router.post('/register', register);
router.post('/login', login);


module.exports = router;


