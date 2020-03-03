// req.flash ne marche pas fair la gestion d'err plus tard


const User = require('../../db/User'),
    bcrypt = require('bcrypt'),
    path = require('path'),
    fs = require('fs')

module.exports = {


    update: async (req, res) => {

        const query = await User.find({

            _id: req.params.id
        })

        User.findByIdAndUpdate(query, {
                status: req.body.status,
                isAdmin: req.body.isAdmin,
                isVerified: req.body.isVerified,
                isBan: req.body.isBan,
            },
            (err, post) => {
                if (err) {
                    console.log(err);

                    res.redirect('/')
                } else {
                    console.log('update ');

                    res.redirect('/admin')


                }
            })
    }

}