module.exports = (req,res,next) => {


    if (req.session.isAdmin != true) {
        console.log('vous n\'avez pas de compte');
         res.render('user/login')  

    }else{
      next()  
    }


}