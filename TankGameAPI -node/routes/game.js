var mongoose = require('mongoose');
var router = require('express').Router();
var Player = mongoose.model('player');
const md5 = require('md5');
const sessionManager = require('./../controllers/sessionManager');
const roomManager = require('./../controllers/roomManager');
const salt = md5("this is a salt");

//get rooms
router.get('/room', (req, res, next) => {
    logedIn(req,function(session){
        console.log(session);
        if(session === null){
            return res.sendStatus(403);
        }else{
            return res.status(200).json(roomManager.listRooms());
        }
    });
});

router.get('/room/create', (req, res, next) => {
    logedIn(req,function(session){
        if(session != null){
            Player.findById(session.playerid)
              .then(function(player) {
                if (!player) {
                  return res.sendStatus(404);
                }
                var data = {id:player.id};
                data.userdata = {stats:player.stats,name:player.username};

                console.log(data);
                return res.status(200).json(roomManager.addRoom(data));
                
              })
              .catch(function(reject) {
                return res.status(404).send(reject.message);
              });
        }else{
            return res.status(403);
        }
    });
});

router.get('/room/join/:id', (req, res, next) => {
    const roomID = req.params.id;
    logedIn(req,function(session){
        if(session != null){
            Player.findById(session.playerid)
              .then(function(player) {
                if (!player) {
                  return res.sendStatus(404);
                }
                var data = {id:player.id};
                data.userdata = {stats:player.stats,name:player.username};

                console.log(data);
                return res.status(200).json(roomManager.join(roomID,data));
                
              })
              .catch(function(reject) {
                return res.status(404).send(reject.message);
              });
        }else{
            return res.status(403);
        }
    });
});

function logedIn(req,cb){
    if(req.cookies){
        const token = req.cookies["SessionToken"];
        if(token === undefined){
          cb(null);
        }else{
          sessionManager.getSession(token,cb);
        }
        }else{
          cb(null);
        }
} 

module.exports = router;
