var mongoose = require('mongoose');
var router = require('express').Router();
var Player = mongoose.model('player');

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

router.get('/:id', (req, res, next) => {
  //  let id = new ObjectId(req.params.id);
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

router.post('/', (req, res, next) => {
  //let id = req.body.id;
  let user = req.body.user;
  let kills = req.body.kills;
  let deaths = req.body.deaths;
  let winstrike = req.body.winstrike;
  let wongames = req.body.wongames;
  let totalgames = req.body.totalgames;
  let objplayer = {
    user: user,
    kills: kills,
    deaths: deaths,
    winstrike: winstrike,
    wongames: wongames,
    totalgames: totalgames,
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

router.put('/:id', (req, res, next) => {
  //let ObjectId = mongoose.Types.ObjectId;
  let id = req.params.id;
  let user = req.body.user;
  let kills = req.body.kills;
  let deaths = req.body.deaths;
  let winstrike = req.body.winstrike;
  let wongames = req.body.wongames;
  let totalgames = req.body.totalgames;
  let objplayer = {
    user: user,
    kills: kills,
    deaths: deaths,
    winstrike: winstrike,
    wongames: wongames,
    totalgames: totalgames,
  };

  Player.findByIdAndUpdate(id, objplayer, {upsert: false}, function(err, doc) {
    if (err) {
      console.log('put error:' + err);
      return res.status(400).send({error: err});
    }
    return res.status(200).send('successful update');
  });
});
//wget --method=PUT --body-data="kills=200&deaths=100&winstrike=100&wongames=100&totalgames=200&user='rambo3'" http://localhost:3000/api/players/5beb2f2c0c993b0a848701ce

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
