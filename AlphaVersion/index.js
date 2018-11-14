const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false  }));
/*Returns middleware that only parses urlencoded bodies and only looks 
	* at requests where the Content-Type header matches the type option. This parser 
	* accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.*/
/*The extended option allows to choose between parsing the URL-encoded data with the querystring 
	* library (when false) or the qs library (when true). The "extended" syntax allows for 
	* rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded*/

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/tanques');
require('./models/player.js');
app.use(require('./routes'));
var router=express.Router();
app.use(router);

const port=3000;
app.use(express.static(path.join(__dirname, 'main')));
server.listen(port, '0.0.0.0', function() {
	  console.log('Tanquesitos corriendo en puerto 3000');

});
app.use(function(req,res){res.sendStatus(404);});

