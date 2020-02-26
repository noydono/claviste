/*
 *  module
 * * * * * */

const express = require('express'),
    router = express.Router()
    // multer = require('../config/Multer-config')
    

/*
 *  controllers
 * * * * * */

const indexController = require('./controllers/pages/index'),
    ArticleController = require('./controllers/article/articleController'),
    UserController = require('./controllers/user/userController')


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

    router.route('/article/deleteAll')
    .post(ArticleController.deleteAll)

// ----------------------------CRUD User------------------------------------

router.route('/user/create')
    .post(UserController.create)

router.route('/user/login')
    .post(UserController.login)


module.exports = router