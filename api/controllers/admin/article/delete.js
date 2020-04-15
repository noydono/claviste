const Article = require('../../../db/Article'),
    User = require('../../../db/User'),
    path = require('path'),
    fs = require('fs')


module.exports = {

    delete: async (req, res) => {

        const dbArticle = await Article.findById(req.params.id)
        const dbcallery = dbArticle.callery
        console.log(dbcallery);
        




        Article.findByIdAndRemove(req.params.id, (err) => {
            if (!err) {

                for (i = 0; i < dbcallery.length; i++) {
                    
                    fs.unlink(path.resolve('public/uploads/' + dbcallery[i].nameImg ),
                    (err) => {
                        if (err) {
                            console.log(err)
                        }
                
                    })
                
                }
                res.redirect('/admin/list/article')
                
                

            } else {

                res.redirect('/')
            }
        })


    }


}


