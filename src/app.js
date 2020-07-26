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
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



//Rotas
    require("./routes")(app)
//

    sequelize.sync({force:false}).then(()=>{
    app.listen(config.port)
    console.log("deu certo?")
})


        
   


