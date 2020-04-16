module.exports = (req,res,next) => {


    if (req.cookies.CookieDismiss) {
        
         res.render('cheh',{
           layout : 'cheh'
         })  

    }else{
      next()  
    }


}