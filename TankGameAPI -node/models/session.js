const mongoose = require('mongoose');
var shortId = require('shortid');

const sessionSchema = new mongoose.Schema(
  {
    token: {type: String,unique: true,'default': shortId.generate},
	expire:{type:Date,default: new Date(+new Date() + 7*24*60*60*1000)},
	playerid:{type:String,required:true}
  },
  {timestamps: true},
);
/*If set timestamps, mongoose assigns createdAt and updatedAt fields
 * to your schema, the type assigned is Date.*/
mongoose.model('sessions', sessionSchema);
