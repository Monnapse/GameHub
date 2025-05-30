const { validationResult } = require('express-validator');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Games']
    try {
        const result = await mongodb.getDatabase().db().collection('games').find();
        result.toArray().then((games) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(games);
        })
    } catch (error) {
        return res.status(500).json({ error: error.message || "An error occurred while getting all the games." });
    }
}

const get = async (req, res) => {
    //#swagger.tags = ['Games']
    try {
        const gameId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('games').find({ _id: gameId });
        result.toArray().then((games) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(games[0]);
        })
    } catch (error) {
        return res.status(500).json({ error: error.message || "An error occurred while getting the game." });
    }
}

const create = async (req, res) => {
    //#swagger.tags = ['Games']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {   
        const game = {
            name: req.body.name,
            developer: req.body.developer,
            publisher: req.body.publisher,
            technology: req.body.technology,
            release_date: req.body.release_date,
            genres: req.body.genres,
            cost: req.body.cost,
        };
        const response = await mongodb.getDatabase().db().collection('games').insertOne(game);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating the game.");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message || "An error occurred while creating the game." });
    }
}

const update = async (req, res) => {
    //#swagger.tags = ['Games']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const gameId = new ObjectId(req.params.id);
        const game = {
            name: req.body.name,
            developer: req.body.developer,
            publisher: req.body.publisher,
            technology: req.body.technology,
            release_date: req.body.release_date,
            genres: req.body.genres,
            cost: req.body.cost,
        };
        const response = await mongodb.getDatabase().db().collection('games').updateOne({ _id: gameId }, { $set: game });
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating the game.");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message || "An error occurred while updating the game." });
    }
}

const deleteGame = async (req, res) => {
    //#swagger.tags = ['Games']
    try {
        const gameId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('games').deleteOne({ _id: gameId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while deleting the game.");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message || "An error occurred while deleting the game." });
    }
}

module.exports = {
    getAll,
    get,
    create,
    update,
    deleteGame
}