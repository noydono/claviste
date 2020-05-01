const ArticleVerif = require('../../../db/ArticleVerif'),
        User = require('../../../db/User')
  

module.exports = {

    list: async (req, res) => {

        const dbUser = await User.find({})

        res.render('admin/user/listUser', {
            dbUser: dbUser
        })

    },
    edit: (req, res) => {
        console.log('user controler edit');
        res.render('admin/user/editUser')

    }

}