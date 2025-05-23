const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games');

router.get('/', gamesController.getAll);

router.get('/:id', gamesController.get);

router.post('/', gamesController.create);

router.put('/:id', gamesController.update);

router.delete('/:id', gamesController.deleteGame);

module.exports = router;