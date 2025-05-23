const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', usersController.getAll);

router.get('/:id', usersController.get);

router.post('/', usersController.create);

router.put('/:id', usersController.update);

router.delete('/:id', usersController.deleteUser);

module.exports = router;