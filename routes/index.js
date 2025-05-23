const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

router.get('/users', require('./users'));
router.get('/games', require('./games'));

module.exports = router;