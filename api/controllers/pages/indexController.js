
const Article = require('../../db/Article')

module.exports = {

    get: async (req,res) => {

        console.log(res.local);
        
        const dbArticle = await Article.find({}) 

        console.log(req.session);
        
        res.render('index',{
            dbArticle,
            passwordNotSame: req.flash('passwordNotSame'),
            registerPwdErr: req.flash('registerPwdErr'),
            emailNotUnique: req.flash('emailNotUnique')
        })
    }


}