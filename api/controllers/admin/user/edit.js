const ArticleVerif = require('../../../db/ArticleVerif'),
        User = require('../../../db/User')
  

module.exports = {

   
    
    editId: async (req, res) => {
        const dbUser = await User.findById(req.params.id)

        console.log('editId');
        res.render('admin/user/editUser',{
            dbUser: dbUser
        })

    }

}