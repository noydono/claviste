
const Article = require('../../db/Article')
const User = require('../../db/User')

module.exports = {

    get: async (req,res) => {

        console.log(res.local);
        
        const dbArticle = await Article.find({}) 
        const dbUser = await User.find({

            _id: req.params.id
        })

        console.log(req.session);
        
        res.render('index',{
            dbArticle,
            dbUser,
            passwordNotSame: req.flash('passwordNotSame'),
            registerPwdErr: req.flash('registerPwdErr'),
            emailNotUnique: req.flash('emailNotUnique')
        })
    }


}