const mongoose = require('mongoose'),
 bcrypt = require('bcrypt');


var UserSchema = new mongoose.Schema({

    username: String,
    email: {
        type: String,
        unique: true   //l'email ne doit pas etre identique aux autres utilisateurs
    },
    passwordVerif: String
  

});

// crypter le mot de passe
UserSchema.pre('save', function (next) {

    const user = this                                      //prends le mot de passe

    bcrypt.hash(user.passwordVerif, 10, (error, encrypted) => {  //crypte le (! il faut installer bcrypt : npm i bcrypt)
        user.passwordVerif = encrypted
        next()                                                //et ensuite continue
    })
})

const User = mongoose.model('User', UserSchema);

module.exports = User