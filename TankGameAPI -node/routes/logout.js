var mongoose = require('mongoose');
var router = require('express').Router();


router.get('/', (req, res, next) => {
    res.setHeader("Set-Cookie",`SessionToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT`);
	return res.sendStatus(200);
});



module.exports = router;