var mongoose = require('mongoose');
var router = require('express').Router();
var Player = mongoose.model('player');
const md5 = require('md5');
const salt = md5("this is a salt");
const sessionManager = require('./../controllers/sessionManager');


router.post('/', (req, res, next) => {
    let user = req.body.username;
    let password = req.body.password;
	console.log(req.body);
	
    let logindata = {
      username: user,
      password: md5(salt + password), 
    };

   Player.findOne(logindata).then(function(data) {
    let userdata = data;
	sessionManager.addSession(data.id,function(err,data){
		if(err)
			  return res.status(500).send(err.message);
		else{
        res.setHeader("Set-Cookie",`SessionToken=${data.token};Expires=${data.expire}`);
        res.status(200).json(userdata);
			}
	//error on remove session	  
	},function(err){
		  return res.status(500).send(err.message);
	});
	
	
  })
  .catch(function(reject) {
    return res.status(500).send(reject.message);
  });
});

router.get('/', (req, res, next) => {
	if(req.cookies){
		const token = req.cookies["SessionToken"];
		if(token === undefined){
			return res.sendStatus(403);
		}else{
			sessionManager.getSession(token,function(session){
				if(session === null){
					return res.status(403).send("Session Expired");
				}
				return res.status(200).json(session); 
		});
		}
	}else{
		return res.sendStatus(403);
	}
});


module.exports = router;