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
    adminlistUserController = require('./controllers/admin/user/list'),
    adminEditUserController = require('./controllers/admin/user/edit'),
    adminArticleController = require('./controllers/admin/article/articleController'),
    adminlistArticleController = require('./controllers/admin/article/list'),
    adminEditArticleController = require('./controllers/admin/article/edit'),
    adminArticleVerifController = require('./controllers/admin/articleVerif/articleVerif'),
    adminlistArticleVerifController = require('./controllers/admin/articleVerif/list'),
    adminEditArticleVerifController = require('./controllers/admin/articleVerif/edit')
    


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
    .get(isAdmin,adminController.get)

//-------------------- User -------------------

router.route('/admin/list/user')
    .get(isAdmin,adminUserController.list)

router.route('/admin/list/user/:id')
    .post(isAdmin,adminlistUserController.listPost)
    
router.route('/admin/edit/user')
    .get(isAdmin,adminUserController.edit)

router.route('/admin/edit/user/:id')
    .get(isAdmin,adminEditUserController.editId)

router.route('/admin/update/user/:id')
    .post(isAdmin,adminEditUserController.post)

//-----------------article----------------------

router.route('/admin/list/article')
    .get(isAdmin,adminArticleController.list)

router.route('/admin/list/article/:id')
    .post(isAdmin,adminlistArticleController.listPost)

router.route('/admin/edit/article/:id')
    .get(isAdmin,adminEditArticleController.editId)

router.route('/admin/update/article/:id')
    .post(isAdmin,adminEditArticleController.post)

//--------------articleVerif-----------------------

router.route('/admin/list/articleVerif')
    .get(isAdmin,adminArticleVerifController.list)

router.route('/admin/list/articleVerif/:id')
    .post(isAdmin,adminlistArticleVerifController.listPost)

router.route('/admin/edit/articleVerif/:id')
    .get(isAdmin,adminEditArticleVerifController.editId)

router.route('/admin/update/articleVerif/:id')
    .post(isAdmin,adminEditArticleVerifController.post)



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