const mongoose = require('mongoose');

const statSchema = new mongoose.Schema(
  {
    kills: {type: Number, default:0},
    deaths: {type: Number, default:0},
    winstrike: {type: Number, default:0},
    wongames: {type: Number, default:0},
    totalgames: {type: Number, default:0},
	blocksdestroyed:{type: Number, default:0}
  },
  {timestamps: true},
);
/*If set timestamps, mongoose assigns createdAt and updatedAt fields
 * to your schema, the type assigned is Date.*/
mongoose.model('stats', statSchema);
