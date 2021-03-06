const Article = require('../../db/Article'),
    ArticleVerif = require('../../db/ArticleVerif'),
    User = require('../../db/User'),
    Handlebars = require('handlebars')


    
module.exports = {

    get: async (req, res) => {


        const dbUser = await User.findById(req.session.userId),
            dbAllUser = await User.find({}),
            dbArticle = await Article.find({}),
            dbArticleVerif = await ArticleVerif.find({}),
            ArticleReverse = dbArticle.reverse(),
            ArticleVerifReverse = dbArticleVerif.reverse().slice(0,8)
            var  accept = ""
                if(req.cookies.CookieAccept){
                accept = "true"
                }
            


        res.render('articleVerif/home', {
            dbArticle: ArticleReverse,
            ArticleVerifReverse: ArticleVerifReverse,
            dbUser: dbUser,
            dbAllUser, 
            accept,      
            emailUErr : req.flash('emailUErr'),
            emailU : req.flash('emailU'),            
            usernameErr : req.flash('usernameErr'),
            usernameU : req.flash('usernameU'),
            usernameEmailErr : req.flash('usernameEmailErr'),
            usernameEmailU : req.flash('usernameEmailU'),
            fileErr : req.flash('fileErr'),
            fileU : req.flash('fileU'),
            fileEmailErr : req.flash('fileEmailErr'),
            fileEmailU : req.flash('fileEmailU'),
            fileUsernameErr : req.flash('fileUsernameErr'),
            fileUsernameU : req.flash('fileUsernameU'),
            fileUsernameEmailErr : req.flash('fileUsernameEmailErr'),
            fileUsernameEmailU : req.flash('fileUsernameEmailU'),
            login : req.flash('login'),
            inscription : req.flash('inscription'),
            ArticleErr : req.flash('ArticleErr'),
            ArticleC : req.flash('ArticleC'),
            addVerifPost : req.flash('addVerifPost'),
            verifOk: req.flash('verifOk'),
            mdpOublierC : req.flash('mdpOublierC'),
            ArticleErrNoContent : req.flash('ArticleErrNoContent')
            
            
        })
    },
    clearCookie : (req,res) =>  {


        res.clearCookie(`CookieDismiss`)
        res.redirect ('/')

    }


}