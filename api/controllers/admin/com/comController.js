const ArticleVerif = require('../../../db/ArticleVerif'),
        User = require('../../../db/User'),
        Com = require ('../../../db/commentaire')

  

module.exports = {

    list: async (req, res) => {

        dbCom = await Com.find({ article_id: req.params.id }),
        Coms = dbCom.reverse() 

        res.render('admin/commentaire/listCommentaire',{
            dbCom : Coms,
            comDel : req.flash('comDel')
        })

    },
    delCom: async (req, res) => {

        const dbCom = await Com.findById({ _id: req.params.id })
        dbCom.deleteOne({ _id: req.params.id })
        req.flash('comDel', '.')
        res.redirect('back')
    }

}