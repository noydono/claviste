module.exports = (req, res, next) => {

    if (!req.session.userId) {
        console.log('vous n\'avez pas de compte');
         res.render('user/login')  

    }else{
      next()  
    }


}