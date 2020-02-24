/*
 *  module
 * * * * * */

const   express = require('express') ,
        router = express.Router()

/*
 *  controllers
 * * * * * */

const indexController = require('./controllers/pages/index'),
    createArticleController = require ('./controllers/article/articleCreate')




/*
 *  Route
 * * * * * */
router.route('/')
    .get(indexController.get)
//---------------------------------CRUD Article-------------------------

router.route('/article/create')
    .post(createArticleController.create)

module.exports = router