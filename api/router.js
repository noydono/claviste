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
    adminEditArticleVerifController = require('./controllers/admin/articleVerif/edit'),
    adminDeleteArticleController = require('./controllers/admin/article/delete'),
    adminDeleteArticleVerifController = require('./controllers/admin/articleVerif/delete'),
    adminDeleteUserController = require('./controllers/admin/user/delete'),
    adminComController = require ('./controllers/admin/com/comController'),
    adminSignaleController = require ('./controllers/admin/signale/signalController'),
    rgpdcontroller = require('./controllers/legal/rgpdController'),
    sitemap = require('./controllers/pages/sitemapController')
    
    


                    /* * * * * * * * * * * * * * * * * * * * * * * */
                    /* * * * * * * *  middelware * * * * * * * * * */
                    /* * * * * * * * * * * * * * * * * * * * * * * */

const isAdmin = require('./middleware/isAdmin'),
    auth = require('./middleware/auth'),
    cheh = require('./middleware/rgpdDismiss')



const { check, validationResult } = require('express-validator')



    

                    /* * * * * * * * * * * * * * * * * * * * * * * */
                    /* * * * * * * *  page * * * * * * * * * * * * */
                    /* * * * * * * * * * * * * * * * * * * * * * * */


router.route('/')
    .get(cheh,indexController.get)

router.route('/sitemap.xml')
    .get(sitemap.get)

router.route('/clear/cookie')
    .post(indexController.clearCookie)


                    /* * * * * * * * * * * * * * * * * * * * * * * */
                    /* * * * * * * *  Article * * * * * * * * * *  */
                    /* * * * * * * * * * * * * * * * * * * * * * * */


router.route('/article/create')
    .post(multer.array('imgArticle', 5), ArticleController.create)

router.route('/article/update/:id')
    .post(multer.array('imgArticle'), ArticleController.update)

router.route('/article/:id')
    .get(cheh,ArticleSingleController.get)

router.route('/listVerifArticle')
    .get(cheh,ArticleVerifController.get)

router.route('/VerifArticle/:id')
    .get(cheh,ArticleVerifController.getSingle)
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
    .get(cheh,UserController.getInscription)
    .post(multer.single('img'),[

        check('passwordVerif')
            .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
       
    
    ], UserController.create)

router.route('/user/login')
    .get(cheh,UserController.getlogin)
    .post(UserController.login)

router.route('/user/logout')
    .get(cheh,UserController.logout)


                        /* * * * * * * * * * * * * * * * * * * * * * * */
                        /* * * * * * * *  Mon Compte * * * * * * * *  */
                        /* * * * * * * * * * * * * * * * * * * * * * * */

router.route('/moncompte')
    .get(cheh,MonCompteController.get)
    .post(multer.single('img'), MonCompteController.update)




                        /* * * * * * * * * * * * * * * * * * * * * * * */
                        /* * * * * * * *  nodemailer verif * * * * * * */
                        /* * * * * * * * * * * * * * * * * * * * * * * */


router.route('/verify/:id')
    .get(cheh,nodmailercontroller.verifMail)

// envoye du mail de mdp oublier
router.route('/mdpOublier/send')
    .post(nodmailercontroller.postMpdOublier)

// redirige apres le click du lien du mail 
router.route('/mdpOublier/:id')
    .get(cheh,nodmailercontroller.getMpdOublier)

// update du mdp
router.route('/updateMdp/:id')
    .get(cheh,nodmailercontroller.getputmdpOublier)
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
    

router.route('/admin/edit/user/:id')
    .get(isAdmin,adminEditUserController.editId)

router.route('/admin/update/user/:id')
    .post(isAdmin,adminEditUserController.post)

router.route('/admin/delete/user/:id')
    .post(isAdmin,adminDeleteUserController.delete)

//-----------------article----------------------


router.route('/admin/list/article')
    .get(isAdmin,adminArticleController.list)

router.route('/admin/list/article/:id')
    .post(isAdmin,adminlistArticleController.listPost)

router.route('/admin/edit/article/:id')
    .get(isAdmin,adminEditArticleController.editId)

router.route('/admin/update/article/:id')
    .post(isAdmin,adminEditArticleController.post)

router.route('/admin/delete/article/:id')
    .post(isAdmin,adminDeleteArticleController.delete)

router.route ('/signale/:id')
    .post(auth,adminSignaleController.postSignale)

router.route('/admin/list/signale/:id')
    .get(isAdmin,adminSignaleController.list)

router.route('/admin/delete/signale/:id')
    .post(isAdmin,adminSignaleController.delSignale)

//--------------articleVerif-----------------------

router.route('/admin/list/articleVerif')
    .get(isAdmin,adminArticleVerifController.list)

router.route('/admin/list/articleVerif/:id')
    .post(isAdmin,adminlistArticleVerifController.listPost)

router.route('/admin/edit/articleVerif/:id')
    .get(isAdmin,adminEditArticleVerifController.editId)

router.route('/admin/update/articleVerif/:id')
    .post(isAdmin,multer.array('imgArticle', 5),adminEditArticleVerifController.post)

router.route('/admin/delete/articleVerif/:id')
    .post(isAdmin,adminDeleteArticleVerifController.delete)

router.route('/admin/list/com/:id')
    .get(isAdmin,adminComController.list)

router.route('/admin/delete/com/:id')
    .post(isAdmin,adminComController.delCom)


/* * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * *  Contact * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * */


router.route('/contact/create')
    .post(ContactController.create)

router.route('/admin/list/contact')
    .get(cheh,ContactController.list)

router.route('/admin/delete/Contact/:id')
    .post(isAdmin,ContactController.delContact)



    
/* * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * *  Mentions legal * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * */

router.route('/mentionLegal')
    .get(cheh,mentionLegalController.get)
router.route('/rgpd')
    .post(rgpdcontroller.post)


module.exports = router