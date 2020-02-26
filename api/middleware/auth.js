module.exports = (req, res, next) => {

    if (req.session.id) {

        return res.redirect('/')  

    }
next()

}