module.exports = (req, res, next) => {

    if (req.session.isVerified !== true) {

        console.log('vous n\'avez pas de compte');
        req.flash('mdwVerif','.')
        res.render('user/login')  

    } else{

        next()

    }


}