const Article = require('../../db/Article'),
    User = require('../../db/User'),
    Com = require('../../db/Commentaire')


module.exports = {

    get: async (req, res) => {

        Handlebars.registerHelper('filterId', function (id) {

            if( id = article )
            
            return 
        })
        
        // recuperation de db dans variable
        const dbUser = await User.findById(req.session.userId)

        // const pourcent = nvote/TOTalUser*100
        const dbArticle = await Article.find({}),
            dbArticleverif = await Com.findById( dbArticle.id ),
            dbCom = await Com.find({}),
            Coms = dbCom.reverse()

            console.log(dbArticle._id);
            

        res.render('index', {

            dbArticle,
            dbUser,
            Coms,
            passwordNotSame: req.flash('passwordNotSame'),
            registerPwdErr: req.flash('registerPwdErr'),
            emailNotUnique: req.flash('emailNotUnique')

        })
    }


}