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
    port = 3000
/*
 *   api
 * * * * * */
const ROUTER = require('./api/router'),
    keys = require('./config/keys')
    Helper = require('./api/helper/helperHbs')

/*
 *  mongoose
 * * * * * */
mongoose.connect(keys.mongoUri, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,

}, (err) => {

    if (err) {

        console.log('attention erreur de connection' + err);
        res.json(err)

    } else {

        console.log('ATTENTION connecter a mongo cloud!');

    }

});

/*
 *   Express-session
 * * * * * */

app.use(session({

    name: 'biscuit',
    secret: 'Claviste',
    saveUninitialized: true, // ne crée pas de session tant que quelque chose n'est pas stocké
    resave: false, //ne pas enregistrer la session si non modifié
    maxAge: 24 * 60 * 60 * 1000,
    //me permet de stocker la sesion dans un store dans ma db et me la je connect le store a ma db
    store: new MongoStore({
        mongooseConnection: mongoose.connection,

    })

}))


/*
 *   middleware global
 * * * * * */

app.use('*', (req, res, next) => {



    if (res.locals.user = req.session.userId) {


        if (req.session.status === 'user') {

            if (req.session.isVerified === true) {

                if (req.session.isAdmin === true) {



                    res.locals.isAdmin = req.session.isAdmin

                }

                res.locals.isVerified = req.session.isVerified
                
            }
            res.locals.user = req.session.status

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
    layoutsDir: __dirname + '/views/layouts/'
}));



app.use('/', ROUTER)


app.listen(port, () => {

    console.log('connecter sur le port : ' + port);

})