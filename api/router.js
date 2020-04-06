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
    multer = require('../config/Multer-config'),
    MonCompteController = require('./controllers/user/monComptecontroller'),
    CommentaireController = require('./controllers/article/CommentaireController'),
    ContactController = require('./controllers/contact/contactController'),
    nodmailercontroller = require('./controllers/nodemailer/nodemailerController'),
    ArticleSingleController = require('./controllers/article/articleSingleController'),
    ArticleVerifController = require('./controllers/article/articleVerifController'),
    mentionLegalController = require('./controllers/legal/mentionLegalController'),
    adminUserController = require('./controllers/admin/user/userController'),
    adminArticleController = require('./controllers/admin/articleVerif/articleVerif'),
    adminArticleVerifController = require('./controllers/admin/article/articleController'),
    adminlistUserController = require('./controllers/admin/user/list'),
    adminEditUserController = require('./controllers/admin/user/edit')


                    /* * * * * * * * * * * * * * * * * * * * * * * */
                    /* * * * * * * *  middelware * * * * * * * * * */
                    /* * * * * * * * * * * * * * * * * * * * * * * */

const isAdmin = require('./middleware/isAdmin'),
    auth = require('./middleware/auth')

                    /* * * * * * * * * * * * * * * * * * * * * * * */
                    /* * * * * * * *  page * * * * * * * * * * * * */
                    /* * * * * * * * * * * * * * * * * * * * * * * */


router.route('/')
    .get(indexController.get)


                    /* * * * * * * * * * * * * * * * * * * * * * * */
                    /* * * * * * * *  Article * * * * * * * * * *  */
                    /* * * * * * * * * * * * * * * * * * * * * * * */


router.route('/article/create')
    .post(multer.array('imgArticle', 5), ArticleController.create)

router.route('/article/update/:id')
    .post(multer.array('imgArticle'), ArticleController.update)

router.route('/article/delete/:id')
    .post(ArticleController.delete)

router.route('/article/:id')
    .get(ArticleSingleController.get)

router.route('/listVerifArticle')
    .get(ArticleVerifController.get)

router.route('/VerifArticle/:id')
    .get(ArticleVerifController.getSingle)
    .post(ArticleVerifController.addVerif)


                        /* * * * * * * * * * * * * * * * * * * * * * * */
                        /* * * * * * * *  Commentaire & like * * * * * */
                        /* * * * * * * * * * * * * * * * * * * * * * * */

router.route('/commentaire/create/:id')
    .post(auth, CommentaireController.addCom)

router.route('/like/create/:id')
    .post(auth, CommentaireController.addLike)


                        /* * * * * * * * * * * * * * * * * * * * * * * */
                        /* * * * * * * *  User * * * * * * * * * * * * */
                        /* * * * * * * * * * * * * * * * * * * * * * * */

router.route('/user/create')
    .get(UserController.getInscription)
    .post(multer.single('img'), UserController.create)

router.route('/user/login')
    .get(UserController.getlogin)
    .post(UserController.login)

router.route('/user/logout')
    .get(UserController.logout)




                        /* * * * * * * * * * * * * * * * * * * * * * * */
                        /* * * * * * * *  Mon Compte * * * * * * * *  */
                        /* * * * * * * * * * * * * * * * * * * * * * * */

router.route('/moncompte')
    .get(MonCompteController.get)
    .post(multer.single('img'), MonCompteController.update)




                        /* * * * * * * * * * * * * * * * * * * * * * * */
                        /* * * * * * * *  nodemailer verif * * * * * * */
                        /* * * * * * * * * * * * * * * * * * * * * * * */


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



/* * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * *  Admin * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * */

router.route('/admin')
    .get(adminController.get)

//-------------------- User -------------------

router.route('/admin/list/user')
    .get(adminUserController.list)

router.route('/admin/list/user/:id')
    .post(adminlistUserController.listPost)
    

router.route('/admin/edit/user')
    .get(adminUserController.edit)

router.route('/admin/edit/user/:id')
    .get(adminEditUserController.editId)

//-----------------article----------------------

router.route('/admin/list/article')
    .get(adminArticleController.list)



router.route('/admin/edit/article')
    .get(adminArticleController.edit)

//--------------articleVerif-----------------------

router.route('/admin/list/articleVerif')
    .get(adminArticleVerifController.list)



router.route('/admin/edit/articleVerif')
    .get(adminArticleVerifController.edit)


                            /* * * * * * * * * * * * * * * * * * * * * * * */
                            /* * * * * * * *  Contact * * * * * * * * * * * */
                            /* * * * * * * * * * * * * * * * * * * * * * * */


router.route('/contact/create')
    .post(ContactController.create)

    
                            /* * * * * * * * * * * * * * * * * * * * * * * */
                            /* * * * * * * *  Mentions legal * * * * * * * */
                            /* * * * * * * * * * * * * * * * * * * * * * * */

router.route('/mentionLegal')
    .get(mentionLegalController.get)


module.exports = router