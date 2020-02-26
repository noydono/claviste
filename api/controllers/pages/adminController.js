const Article = require('../../db/Article')
    User = require('../../db/User')
module.exports ={


    get: async (req,res)=> {

        
        
        const dbArticle = await Article.find({}) 
        const dbUser = await User.find({}) 
        const adminUser = req.session.username 


        res.render('admin',{
            layout: 'admin',
            dbArticle,
            adminUser,
            dbUser
        })
    }
}