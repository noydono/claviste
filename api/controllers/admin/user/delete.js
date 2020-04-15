const User = require('../../../db/User'),
    path = require('path'),
    fs = require('fs')


module.exports = {

    delete: async (req, res) => {


        
        User.findByIdAndUpdate(req.params.id, {
            status: "ferme"

        }, (err,sucess) => {
            if (err) {

                console.log(err)
                res.redirect('/admin/list/user')

            }else{

                console.log(sucess)
                res.redirect('/admin/list/user')


            }

        })


    }


}


