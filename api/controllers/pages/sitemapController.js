const path = require('path')

module.exports={


    get:(req,res) =>{

        res.sendFile(path.join(__dirname + '../'+'../'+'../'+ '../'+'sitemap.xml'));


    }
}