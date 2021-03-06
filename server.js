/*
 *  Module
 * * * * * */
const express = require('express'),
    app = express(),
    hbs = require('express-handlebars'),
    Handlebars = require('handlebars'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    {
        allowInsecurePrototypeAccess
    } = require('@handlebars/allow-prototype-access'),
    helmet = require('helmet'),
    dotenv = require("dotenv").config(),
    port = process.env.PORT || 4000



/*
 *   api
 * * * * * */
const ROUTER = require('./api/router')

app.use(helmet())


/*
 *  mongoose
 * * * * * */
mongoose.connect(process.env.MONGO_URI, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,

}, (err) => {

    if (err) {

        console.log('attention erreur de connexion' + err);
        res.json(err)

    } else {

        console.log('ATTENTION connecté à mongo cloud!');

    }

});

/*
 *   Express-session
 * * * * * */
app.use(cookieParser())

app.use(session({

    name: 'biscuit',
    secret: 'Claviste',
    saveUninitialized: true, // ne crée pas de session tant que quelque chose n'est pas stocké
    resave: false, //ne pas enregistrer la session si non modifié
    maxAge: 24 * 60 * 60 * 1000,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,

    })

}))


/*
 *   middleware global
 * * * * * */

app.use('*', (req, res, next) => {



    if (res.locals.user = req.session.userId) {


        if (req.session.role === 'user') {

            if (req.session.isVerified === true) {

                if (req.session.isAdmin === true) {



                    res.locals.isAdmin = req.session.isAdmin

                }

                res.locals.isVerified = req.session.isVerified

            }
            res.locals.user = req.session.role

        }

    }


    // La function next permet qu'une fois la condition effectuer il reprenne son chemin
    next()
})


/*
 *   FLash
 * * * * * */
app.use(flash())

/*
 *   Morgan
 * * * * * */
app.use(morgan('dev'));

/*
 *   hbs Moment
 * * * * * */
const MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

/*
 *   Body Parser
 * * * * * */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// parse application/json
app.use(bodyParser.json())


/*
 *  express
 * * * * * */
app.use('/public', express.static('public'));


/*
 *  hbs
 * * * * * */
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    handlebars: allowInsecurePrototypeAccess(Handlebars),

}));



app.use('/', ROUTER)

// // Error404
// app.use((req, res) => {
//     res.render('error404')
// })

app.listen(port, () => {

    console.log('connecter sur le port : ' + port);

})

module.exports = app