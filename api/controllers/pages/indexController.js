
const Article = require('../../db/Article')
const User = require('../../db/User')

module.exports = {

    get: async (req,res) => {
        
        const dbArticle = await Article.find({})
        const dbUser = await User.findById(req.session.userId)
        

        console.log(req.session)
        console.log(dbUser);
        
        res.render('index',{
            dbArticle,
            dbUser,
            passwordNotSame: req.flash('passwordNotSame'),
            registerPwdErr: req.flash('registerPwdErr'),
            emailNotUnique: req.flash('emailNotUnique')
        })
    }


}