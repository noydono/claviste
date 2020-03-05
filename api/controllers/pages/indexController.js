const Article = require('../../db/Article'),
    User = require('../../db/User'),
    Com = require('../../db/Commentaire')


module.exports = {

    get: async (req, res) => {

        // recuperation de db dans variable
        const dbUser = await User.findById(req.session.userId)

        // const pourcent = nvote/TOTalUser*100
        const dbArticle = await Article.find({}),
            dbArticleverif = await Article.find({ articleVerified: 2 }),
            dbCom = await Com.find({}),
            Coms = dbCom.reverse()


        console.log(dbArticle)

        res.render('index', {

            dbArticle,
            dbArticleverif,
            dbUser,
            Coms,
            passwordNotSame: req.flash('passwordNotSame'),
            registerPwdErr: req.flash('registerPwdErr'),
            emailNotUnique: req.flash('emailNotUnique')

        })
    }


}