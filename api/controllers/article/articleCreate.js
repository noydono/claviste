const Article = require ('../../db/Article') 


module.exports = {



    create : (req,res) => {

        console.log('creat article');

        Article.create({

            title : req.body.title,
            content : req.body.content,
            author : req.body.author,

        }, (err,post) => {

            if (err){
                console.log('article nest pas post ' + err);
                
            }else{
                console.log('article crée');
                
                res.redirect('/')
            }
        })
        

    }
}