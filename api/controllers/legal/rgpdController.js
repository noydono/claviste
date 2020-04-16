//en parler a examin

module.exports={
    post : (req,res) => {


        if(req.body.accept === "accept"){
            console.log('accpet');
            
            res.clearCookie(`CookieDismiss`)
            res.cookie('CookieAccept', { domain: '.coucou', path: '/coucou', secure: true, resave: false, consent:true })


        }else if(req.body.dismiss === "dismiss"){

            res.clearCookie(`CookieAccept`)
            res.cookie('CookieDismiss', { domain: '.coucou', path: '/coucou', secure: true, resave: false, consent:true, maxAge: 60000 })


        }

        res.redirect('/')
        
    }
}