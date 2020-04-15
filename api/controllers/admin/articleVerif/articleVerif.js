const ArticleVerif = require('../../../db/ArticleVerif'),
        User = require('../../../db/User'),
        Com = require ('../../../db/commentaire')

  

module.exports = {

    list: async (req, res) => {

        const dbArticleVerif = await ArticleVerif.find({}),
        dbCom = await Com.find({ article_id: req.params.id }),
        Coms = dbCom.reverse() 

        res.render('admin/articleVerif/listArticleVerif',{
            dbArticleVerif :dbArticleVerif,
            dbCom : Coms,
            ArticleVerifU:req.flash('ArticleVerifU')

        })

    },
    view: (req, res) => {

        res.render('admin/articleVerif/viewArticleVerif')

    },
    edit: (req, res) => {
        
        res.render('admin/articleVerif/editArticleVerif')

    }

}