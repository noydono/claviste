 // Toujour Commenter
/**
 * Controller ...
 * 
 */

const Com = require('../../db/Commentaire')

module.exports = {

        addCom: async (req, res) => {

            console.log('add Com');
            


            Com.create({

                createDate: new Date(),
                article_id: req.params.id,
                username: req.session.username || req.session.lastname + " " + req.session.firstname,
                content: req.body.content,
                
            }, (err, post) => {

                if(err){
                    console.log(err);
                }else{

                    res.redirect('back')

                }

            })
            
           

        },
        DelCom: async (req, res) => {

                const dbCom = await Com.findById({ _id: req.params.id })
                dbCom.deleteOne({ _id: req.params.id })
                res.redirect('/')

            



        }

    }


