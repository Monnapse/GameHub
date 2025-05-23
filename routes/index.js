const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/users', require('./users'));

router.use('/games', require('./games'));

module.exports = router;