var mongoose = require('mongoose');
var router = require('express').Router();
var Player = mongoose.model('player');
const md5 = require('md5');
const sessionManager = require('./../controllers/sessionManager');
const salt = md5("this is a salt");

//get players
router.get('/', (req, res, next) => {
  Player.find({})
    .then(function(players) {
      if (!players) {
        return res.sendStatus(404);
      }
      return res.status(200).json({players: players});
    })
    .catch(function(reject) {
      return res.status(404).send(reject.message);
    });
});

router.get('/current',(req, res, next) => {

  if(req.cookies){
    const token = req.cookies["SessionToken"];
    if(token === undefined){
      return res.sendStatus(403);
    }else{
      sessionManager.getSession(token,function(session){
		if(session === null){
			res.setHeader("Set-Cookie",`SessionToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT`);		
			return res.status(403).send("Session Expired");
		}
		return res.status(200).json(session); 
      });
    }
    }else{
      return res.sendStatus(403);
    }
  } 
  
);

//get player by id
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Player.findById(id)
    .then(function(player) {
      if (!player) {
        return res.sendStatus(404);
      }
      return res.status(200).json({player: player});
    })
    .catch(function(reject) {
      return res.status(404).send(reject.message);
    });
});

//create player
router.post('/signup', (req, res, next) => {
  let user = req.body.username;
  let password = req.body.password;
  let objplayer = {
    username: user,
    password: md5(salt + password),
  };
  let player = new Player(objplayer);
  player.save(function(err) {
    if (err !== null) {
      console.log('post error:' + err);
      return res.sendStatus(400);
    } else {
      return res.status(201).send('successful post');
    }
  });
});
//Para probarlo localmente:
/*wget --post-data "kills=200&deaths=100&winstrike=100&wongames=100&totalgames=200&user='rambo3'" http://localhost:3000/api/players
 */
//update player data
router.put('/:id', (req, res, next) => {
  //let ObjectId = mongoose.Types.ObjectId;
  let id = req.params.id;
  let stats = req.body.stats;
  let password = req.body.password;
  let objplayer = {};
    //secure password with salt
    console.log(stats);
  if(password !== undefined)  objplayer.password = md5(salt + password);
  if(stats !== undefined) objplayer.stats = stats;

  Player.findByIdAndUpdate(id, objplayer, {upsert: false}, function(err, doc) {
    if (err) {
      console.log('put error:' + err);
      return res.status(400).send({error: err});
    }
    return res.status(200).send('successful update');
  });
});
//wget --method=PUT --body-data="kills=200&deaths=100&winstrike=100&wongames=100&totalgames=200&user='rambo3'" http://localhost:3000/api/players/5beb2f2c0c993b0a848701ce

//delete 
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Player.findByIdAndRemove(id, function(err, doc) {
    if (err) {
      console.log('delete error:' + err);
      return res.status(400).send({error: err});
    }
    return res.status(200).send('successful delete');
  });
});
//wget --method=DELETE  http://localhost:3000/api/players/5beb2f2c0c993b0a848701ce

module.exports = router;
