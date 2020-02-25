const mongoose = require('mongoose'),
 bcrypt = require('bcrypt');


var UserSchema = new mongoose.Schema({

    googleId:String,

    username:String,
   
    email: {
        type: String,
        unique: true   
    },
    passwordVerif: {
        type: String,
    },

    status: {
        type: String,
        default: 'user'
    },

    isAdmin: {
    type: Boolean,
    default: false
    },

    isBan: {
    type: Boolean,
    default: false
    },

    isVerified: {
    type: Boolean,
    default: false
    },

    createDate: {
        type: Date,
        default: new Date()
        },

    img:String,

    nameImg : String

});

// crypter le mot de passe
UserSchema.pre('save', function (next) {

    const user = this                                      //prends le mot de passe

    bcrypt.hash(user.password, 10, (error, encrypted) => {  //crypte le (! il faut installer bcrypt : npm i bcrypt)
        user.password = encrypted
        next()                                                //et ensuite continue
    })
})

const User = mongoose.model('User', UserSchema);

module.exports = User