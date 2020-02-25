/*
 *  module
 * * * * * */

const express = require('express'),
    router = express.Router(),
    multer = require('../config/Multer-config')
    

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
    .post(multer,ArticleController.create)

router.route('/article/update/:id')
    .post(multer,ArticleController.update)

router.route('/article/delete/:id')
    .post(ArticleController.delete)

    router.route('/article/deleteAll')
    .post(ArticleController.deleteAll)


module.exports = router