const ArticleVerif = require('../../../db/ArticleVerif'),
    User = require('../../../db/User'),
    path = require('path'),
    fs = require('fs')


module.exports = {

    delete: async (req, res) => {

        const dbArticleVerif = await ArticleVerif.findById(req.params.id)
        const dbcallery = dbArticleVerif.callery
        console.log(dbcallery);
        




        ArticleVerif.findByIdAndRemove(req.params.id, (err) => {
            if (!err) {

                for (i = 0; i < dbcallery.length; i++) {
                    
                    fs.unlink(path.resolve('public/uploads/' + dbcallery[i].nameImg ),
                    (err) => {
                        if (err) {
                            console.log(err)
                        }
                
                    })
                
                }
                res.redirect('/admin/list/articleVerif')
                
                

            } else {

                res.redirect('/')
            }
        })


    }


}


