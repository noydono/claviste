const mongoose = require('mongoose'),
 bcrypt = require('bcrypt');


var UserSchema = new mongoose.Schema({

    username: {
        
        type: String,
        unique: true, 

    },
    email: {
        
        type: String,
        unique: true, 
           //l'email ne doit etre identique aux autres utilisateurs
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isBan:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        default:'user'
    },
    passwordVerif: String,

    cover: {
        type:String,
        default:'/public/img/coverDefault.jpeg'
    } ,
    
    avatarImg: String,
    avatarName: String,
    like:[
        {

        article_id:String,
        title : String

    }],
    verif:[
        {

        article_id:String,

    }]
});

// chiffrée le mot de passe
UserSchema.pre('save', function (next) {

    const user = this                                      //prends le mot de passe

    bcrypt.hash(user.passwordVerif, 10, (error, encrypted) => {  //crypte le (! il faut installer bcrypt : npm i bcrypt)
        user.passwordVerif = encrypted
        next()                                                //et ensuite continue
    })
})

const User = mongoose.model('User', UserSchema);

module.exports = User