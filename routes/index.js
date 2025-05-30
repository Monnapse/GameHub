const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/games', require('./games'));

router.get('/login', passport.authenticate('github', {}));
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) return next(err);
        res.redirect('/');
    })
});

module.exports = router;