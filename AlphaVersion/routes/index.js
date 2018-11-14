var router=require('express').Router();

router.use('/api/players', require('./player'));

module.exports=router;
