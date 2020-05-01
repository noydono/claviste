const Article = require('../api/db/Article');

describe('CREATE // Creation Article', () => {
    it('CREATE 1 // Créé article title test', (done) => {

        Article.findByIdAndUpdate( {

            title:'',
            content:'' ,
            author:''

        })
        done()
    })
});