require('dotenv').config();

const express = require ("express")
const bodyParser = require("body-parser")
const cors = require ("cors")
const {sequelize} = require("./models")
const Sequelize = require("sequelize")
const config = require("./config/config")
const morgan = require("morgan")




const app = express();
 
app.use (morgan('combined'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept");
        next();
    });



//Rotas
    require("./routes")(app)
//

    sequelize.sync({force:false}).then(()=>{
    app.listen(config.port)
    console.log("deu certo?")
})


        
   


