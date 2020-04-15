const ArticleVerif = require('../../../db/ArticleVerif'),
    User = require('../../../db/User')


module.exports = {

    listPost: (req, res) => {

        console.log('listPost')

         if (req.body.edit === 'edit') {

            console.log('coucou edit')
            res.redirect(`/admin/edit/articleVerif/${req.params.id}`)

        } 


    }


}