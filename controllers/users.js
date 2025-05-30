const { validationResult } = require('express-validator');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const result = await mongodb.getDatabase().db().collection('users').find();
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users);
        })
    } catch (error) {
        return res.status(500).json({ error: error.message || "An error occurred while getting all the users." });
    }
}

const get = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('users').find({_id: userId});
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users[0]);
        })
    } catch (error) {
        return res.status(500).json({ error: error.message || "An error occurred while getting the user." });
    }
}

const create = async (req, res) => {
    //#swagger.tags = ['Users']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = {
            username: req.body.username,
            created_at: new Date().toLocaleString(),
            email: req.body.email,
        };
        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating the user.");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message || "An error occurred while creating the user." });
    }
}

const update = async (req, res) => {
    //#swagger.tags = ['Users']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            username: req.body.username,
            created_at: req.body.created_at,
            email: req.body.email,
        };
        const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating the user.");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message || "An error occurred while updating the user." });
    }
}

const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while deleting the user.");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message || "An error occurred while deleting the user." });
    }
}

module.exports = {
    getAll,
    get,
    create,
    update,
    deleteUser
}