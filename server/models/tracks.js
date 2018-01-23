var mongoose = require('mongoose');


var TrackSchema = mongoose.Schema({
  title: { Type: String, required: true },
  artist: { Type: String, required: true },
  duration: { Type: Number, required: true },
  goearId: { Type: String }
});

module.exports = mongoose.model('Track', TrackSchema);
