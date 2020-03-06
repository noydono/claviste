const Article = require('../../db/Article'),
    User = require('../../db/User'),
    Handlebars = require('handlebars')


module.exports = {

    get: async (req, res) => {


        const dbUser = await User.findById(req.session.userId),
            dbAllUser = await User.find({}),
            dbArticle = await Article.find({})

        let dbArticleVerif = [];

        for (i = 0; i < dbArticle.length; i++) {


            let totalUser = dbAllUser.length,
                resultat = dbArticle[i].articleVerified / totalUser * 100
            console.log(resultat);

            if (dbArticle[i].articleVerified >= resultat) {
                dbArticleVerif.push(this)

            }

        }


        // if (a === resultat) {

        //     let 

        // }



        console.log(dbArticleVerif);




        // console.log(dbArticle);

        res.render('index', {

            dbArticle,
            dbUser,
            passwordNotSame: req.flash('passwordNotSame'),
            registerPwdErr: req.flash('registerPwdErr'),
            emailNotUnique: req.flash('emailNotUnique')

        })
    }


}