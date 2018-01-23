var express = require('express');
var router  = express.Router();

var request = require('superagent');
var cheerio = require('cheerio');
var cheerio = require('cheerio');
var jwt     = require('jsonwebtoken');

var User = require('../models/user');


String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};


router.get('/search/:q/', function(req, res) {
  var url = `http://www.goear.com/search/${req.params.q}?viewmode=iframe`;
  request
    .get(url)
    .end( (error, respnse) => {
      var $ = cheerio.load(respnse.text);
      var songs = [];
      $('ol.board_list.results_list > li.board_item.sound_item.group').each(function() {
        songs.push( {
            'title': $(this).find('.title').text().capitalize(),
            'artist': $(this).find('.band').text().capitalize(),
            'duration': $(this).find('.length').text(),
            'bitrate': $(this).find('.kbps').text(),
            'id': $(this).find('.band_img img').attr('soundid'),
            'file': "http://www.goear.com/action/sound/get/" + $(this).find('.band_img img').attr('soundid'),
            'cover': $(this).find('.band_img img').attr('src'),
          });

      });
      res.json(songs);
    });
});

router.get('/category/:category/', function(req, res) {
  var url = `http://www.goear.com/categories/${req.params.category}?viewmode=iframe`;
  var valid_categories = [
        "blues", "classical", "contemporary", "country", "electronic", "gospel", "humor", "indie", "jazz", "latin",
        "metal", "pop", "punk", "rythm", "hiphop", "reggae", "reggaeton", "rock", "ska"
    ];
  if (valid_categories.indexOf(req.params.category) >= 0) {
    request
      .get(url)
      .end( (error, respnse) => {
        var j = /JSON.parse\(\'(.+)\'\);/.exec(respnse.text)[1]
        // replace \"
        j = j.replace(/\\\\\"/g, "'");
        j = j.replace(/\\/g, '');
        var rawSongs = JSON.parse(j);;
        var songs = [];
        for(var song of rawSongs) {
          songs.push({
            'title': song.title.capitalize(),
            'artist': song.artist.capitalize(),
            'duration': song.duration,
            'bitrate': song.bitrate,
            'id': song.soundid,
            'file': "http://www.goear.com/action/sound/get/" + song.soundid,
            'cover': "http://www.goear.com/band/soundpicture/" + song.soundid
        });
      };
        res.json(songs);
      });

  } else {
    res.send('[]')
  }
});


router.post('/singup/', function(req, res, next) {
  User.findOne( {'local.email': req.body.email }, function (err, user) {
    if (err){
      return done(err);
    }
    // check to see if theres already a user
    if (user) {
      res.json({ success: false, message: 'Email already exist.' });
    } else {
      User.create({ local: {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
      }}, function(err, user){
        if (!err) {
          res.json({ success: true, message: 'User created.' });
        }
      });
    }
  });

});

router.get('/login/', function(req, res) {
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (!user.validPassword(req.body.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right, create a token
        var token = jwt.sign({
            user: { id: user._id}
          }, app.get('jwt-key'), {
            expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});


router.get('/user/:id', function (req, res) {
  // user profile
  if (req.params.id == "me"){
    User.verifyToken(req, function(token) {
      if (token) {
        var userId = token.user.id;
        User.findOne({ _id: userId }, function(err, user){
          if (!user){
            res.json({ success: false, message: 'User not found.' });
          }
          res.json({
            success: true,
            user: {
              id: user._id,
              username: user.username
            }
          });
        });
      }
    });

  } else {
    var userId = req.params.id;
    User.findOne({ _id: userId }, function(err, user){
      if (!user){
        res.json({ success: false, message: 'User not found.' });
      }
      res.json({
        success: true,
        user: {
          id: user._id,
          username: user.username
        }
      });
    });
  }
});

module.exports = router;
