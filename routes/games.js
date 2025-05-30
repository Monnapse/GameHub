const { body } = require('express-validator');
const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games');

const { isAuthenticated } = require('../middleware/authenticate');


router.get('/', gamesController.getAll);

router.get('/:id', gamesController.get);

router.post('/', isAuthenticated, [
    body("name").notEmpty().withMessage("Game name is required"),
    body("developer").notEmpty().withMessage("Developer is required"),
    body("publisher").notEmpty().withMessage("Publisher is required"),
    body("technology").notEmpty().withMessage("Technology is required"),
    body("release_date").notEmpty().withMessage("Release date must be a valid date"),
    body("genres").notEmpty().withMessage("Genres must be an array"),
    body("cost").isNumeric().withMessage("Cost must be a number")
], gamesController.create);

router.put('/:id', isAuthenticated, [
    body("name").notEmpty().withMessage("Game name is required"),
    body("developer").notEmpty().withMessage("Developer is required"),
    body("publisher").notEmpty().withMessage("Publisher is required"),
    body("technology").notEmpty().withMessage("Technology is required"),
    body("release_date").notEmpty().withMessage("Release date must be a valid date"),
    body("genres").notEmpty().withMessage("Genres must be an array"),
    body("cost").isNumeric().withMessage("Cost must be a number")
], gamesController.update);

router.delete('/:id', isAuthenticated, gamesController.deleteGame);

module.exports = router;