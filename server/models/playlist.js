var mongoose = require('mongoose');

/*
 * Extends array funcionality
 */
Array.prototype.move = function(from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};


var PlaylistSchema = mongoose.Schema({
  user: {
    userid: { type: String, required: true },
    username: { type: String, required: true },
  },
  tracks: [],
  live:  { type: Boolean, default: false }
});


PlaylistSchema.methods.moveTrack = function() {
  this.tracks.move(from, to);
}


module.exports = mongoose.model('Playlist', PlaylistSchema);
