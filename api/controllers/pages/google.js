const path = require('path')

module.exports={


    sitemap:(req,res) =>{

        res.sendFile(path.join(__dirname + '../'+'../'+'../'+ '../'+'sitemap.xml'));


    },
    robot:(req,res)=> {
        res.sendFile(path.join(__dirname + '../'+'../'+'../'+ '../'+'robot.txt'));

    }
}