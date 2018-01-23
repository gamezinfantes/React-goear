var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

var jwtKey = require('../config').jwtKey;


var UserSchema = mongoose.Schema({
  local: {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
  }
});

UserSchema.methods.generateHash = function() {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

UserSchema.methods.verifyToken = function(req, callback) {
  if (callback) {
    done = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      return process.nextTick(function() {
        callback.apply(null, args);
      });
    };
  } else {
    done = function(err, data) {
      if (err) throw err;
      return data;
    };
  }

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, jwtKey, function(err, decoded) {
      if (err) {
        return done(false);
      } else {
        // if everything is good, save to request for use in other routes
        return done(decoded);
      }
    });

  }
};


UserSchema.pre('save', function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')){
    next();
  }
  user.local.password = UserSchema.methods.generateHash(user.local.password);
  next();
});

module.exports = mongoose.model('User', UserSchema);
