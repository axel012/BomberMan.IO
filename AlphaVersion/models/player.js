const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
  {
    user: {type: String, required: true, lowercase: true, unique: true},
    kills: {type: Number, required: true},
    deaths: {type: Number, required: true},
    winstrike: {type: Number, required: true},
    wongames: {type: Number, required: true},
    totalgames: {type: Number, required: true},
  },
  {timestamps: true},
);
/*If set timestamps, mongoose assigns createdAt and updatedAt fields
 * to your schema, the type assigned is Date.*/
mongoose.model('player', playerSchema);
