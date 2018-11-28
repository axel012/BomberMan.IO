const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const cookieParser = require('cookie-parser')

//model definitions
require('./models/stats.js');
require('./models/player.js');
require('./models/session.js');

//middlewares
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(bodyParser.urlencoded({ extended: false  }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('./routes'));

//mongoose conection
//TODO:save connection string in config file
mongoose.connect('mongodb://t4nksgame:t4nksgame@ds053449.mlab.com:53449/tankgame');

var router=express.Router();
app.use(router);

const port=3000;
app.use(express.static(path.join(__dirname, 'main')));
server.listen(port, '0.0.0.0', function() {
	  console.log('Tank API running on 3000');

});
//not found error
app.use(function(req,res){res.sendStatus(404);});

