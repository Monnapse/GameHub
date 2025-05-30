const { body } = require('express-validator');
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', usersController.getAll);

router.get('/:id', usersController.get);

router.post('/', isAuthenticated, [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("created_at").optional().notEmpty().withMessage("Created at must be a valid date")
], usersController.create);

router.put('/:id', isAuthenticated, [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("created_at").optional().notEmpty().withMessage("Created at must be a valid date")
    ], usersController.update);

router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;