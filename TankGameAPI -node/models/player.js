const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
  {
    username:{	
				type: String, 
				required: true, 
				lowercase: true, 
				unique: true
			 },
	password:{ 
				type:String,
				required:true,
			 },
	stats:{  
				kills: {type: Number, default:0},
				deaths: {type: Number, default:0},
				winstrike: {type: Number, default:0},
				wongames: {type: Number, default:0},
				totalgames: {type: Number, default:0},
				blocksdestroyed:{type: Number, default:0}
			}
  },
  {timestamps: true},
);
/*If set timestamps, mongoose assigns createdAt and updatedAt fields
 * to your schema, the type assigned is Date.*/
mongoose.model('player', playerSchema);
