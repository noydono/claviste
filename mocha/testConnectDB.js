const mongoose = require('mongoose');
//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:arinfo20@cluster0-uncir.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
}); 

mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });

// //Called hooks which runs before something.
// beforeEach((done) => {
//     mongoose.connection.collections.articles.drop(() => {
//          //this function runs after the drop is completed
//         done(); //go ahead everything is done now.
//     }); 
// });