/*
 *  module
 * * * * * */

const express = require('express'),
    router = express.Router()
    // multer = require('../config/Multer-config')
    
/*
 *  controllers
 * * * * * */

const indexController = require('./controllers/pages/indexController'),
    ArticleController = require('./controllers/article/articleController'),
    UserController = require('./controllers/user/userController'),
    adminController = require('./controllers/pages/adminController'),
    multer = require ('../config/Multer-config'),
    MonCompteController = require('./controllers/user/monComptecontroller')
/*
 *  middleware
 * * * * * */
const isAdmin = require('./middleware/isAdmin')

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


// ----------------------------CRUD User------------------------------------

router.route('/user/create')
    .post(multer,UserController.create)

router.route('/user/login')
    .post(UserController.login)

router.route('/user/logout')
    .post(UserController.logout)

router.route('/User/update/:id')
    .post(multer,UserController.update)
router.route('moncompte/update')
    .post(multer,MonCompteController.update)
// ----------------------------layout Admin------------------------------------
router.route('/admin')
.get(adminController.get)


module.exports = router