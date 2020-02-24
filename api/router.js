/*
 *  module
 * * * * * */

const express = require('express'),
    router = express.Router()

/*
 *  controllers
 * * * * * */

const indexController = require('./controllers/pages/index'),
    ArticleController = require('./controllers/article/articleController')


/*
 *  Route
 * * * * * */
router.route('/')
    .get(indexController.get)
//---------------------------------CRUD Article-------------------------

router.route('/article/create')
    .post(ArticleController.create)

router.route('/article/update/:id')
    .post(ArticleController.update)

router.route('/article/delete/:id')
    .post(ArticleController.delete)


module.exports = router