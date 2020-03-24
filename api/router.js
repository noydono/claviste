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
    MonCompteController = require('./controllers/user/monComptecontroller'),
    CommentaireController = require('./controllers/article/CommentaireController'),
    ContactController = require('./controllers/contact/contactController'),
    nodmailercontroller = require('./controllers/nodemailer/nodemailerController'),
    ArticleSingleController = require('./controllers/article/articleSingleController'),
    ArticleVerifController= require('./controllers/article/articleVerifController')
    

/*
 *  middleware
 * * * * * */
const isAdmin = require('./middleware/isAdmin'),
    auth = require('./middleware/auth')

/*
 *  Route
 * * * * * */
router.route('/')
    .get(indexController.get)
//--------------------------------Article-------------------------

router.route('/article/create')
    .post(multer,ArticleController.create)

router.route('/article/update/:id')
    .post(multer,ArticleController.update)

router.route('/article/delete/:id')
    .post(ArticleController.delete)

// router.route('/article/deleteAll')
//     .post(ArticleController.deleteAll)

router.route('/article/:id')
    .get(ArticleSingleController.get)

router.route('/listVerifArticle')
    .get(ArticleVerifController.get)

router.route('/VerifArticle/:id')
    .get(ArticleVerifController.getSingle)
    .post(ArticleVerifController.addVerif)



// ---------------------------- Commentaire & like ---------------------

router.route('/commentaire/create/:id')
    .post(auth,CommentaireController.addCom)

router.route('/like/create/:id')
    .post(auth,CommentaireController.addLike)



// ---------------------------- User------------------------------------

router.route('/user/create')
    .get(UserController.getInscription)
    .post(multer,UserController.create)

router.route('/user/login')
    .get(UserController.getlogin)
    .post(UserController.login)

router.route('/user/logout')
    .get(UserController.logout)


//--------------------------Mon Compte----------------------------------

router.route('/moncompte')
    .get(MonCompteController.get)
    .post(multer,MonCompteController.update)


//--------------------------nodemailer verif----------------------------

router.route('/verify/:id')
.get(nodmailercontroller.verifMail)

// envoye du mail de mdp oublier
router.route('/mdpOublier/send')
.post(nodmailercontroller.postMpdOublier)

// redirige apres le click du lien du mail 
router.route('/mdpOublier/:id')
.get(nodmailercontroller.getMpdOublier)

// update du mdp
router.route('/updateMdp/:id')
.get(nodmailercontroller.getputmdpOublier)
.post(nodmailercontroller.putMdpOublier)




// ---------------------------- Admin-----------------------------------

router.route('/admin')
.get(adminController.get)


// ---------------------------- Contact---------------------------------

router.route('/contact/create')
    .post(ContactController.create)


module.exports = router