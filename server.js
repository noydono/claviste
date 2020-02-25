/*
 *  Module
 * * * * * */
const   express = require('express'),
        app = express(),
        hbs = require('express-handlebars'),
        Handlebars = require('handlebars')
        mongoose = require('mongoose'),
        bodyParser = require('body-parser'),
        morgan = require('morgan'),
        
        port = 3000
/*
 *   api
 * * * * * */
const ROUTER = require('./api/router'),
        keys = require('./config/keys')
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
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())
/*
 *  mongoose
 * * * * * */
mongoose.connect(keys.mongoLocal , {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,

}, (err)=> {

    if(err){

            console.log('attention erreur de connection' + err);
            res.json(err)
        
    }else{

            console.log('ATTENTION connecter a mongo cloud!');

    }
    
});

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
    defaultLayout: 'main'
}));

app.use('/', ROUTER)

app.listen(port, () => {

    console.log('connecter sur le port : ' + port);
    
})