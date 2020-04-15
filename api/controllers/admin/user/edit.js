const ArticleVerif = require('../../../db/ArticleVerif'),
        User = require('../../../db/User')
  

module.exports = {

   
    
    editId: async (req, res) => {
        const dbUser = await User.findById(req.params.id)

        console.log('editId');
        res.render('admin/user/editUser',{
            dbUser: dbUser
        })

    },
    post: async (req, res) => {

        const id = req.params.id


        User.findByIdAndUpdate(id,{

            username: req.body.username,
            email:req.body.email,
            role: req.body.role,
            status:req.body.status

        },(err,post) => {
            if (err){


            }else{

            res.redirect('/admin/list/user')

            }
        }) 
    

        


        




    }

}