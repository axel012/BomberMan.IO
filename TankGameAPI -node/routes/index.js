var router=require('express').Router();

router.use('/api/players', require('./player'));
router.use('/api/login', require('./login'));
router.use('/api/game', require('./game'));
router.use('/api/logout', require('./logout'));

module.exports=router;
