const AuthenticationController = require("./controllers/AuthenticationController")
const DenunciaController = require("./controllers/DenunciaController")
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy")
const ProjetosController = require("./controllers/ProjetosController")
const multerConfig = require ("./config/multerConfig")
const multerConfigArquivo = require ("./config/multerConfigArquivo")
const multer = require("multer")


module.exports = (app) =>{
    app.post("/register", AuthenticationControllerPolicy.register,
    AuthenticationController.register)

    app.post("/denunciar",
    DenunciaController.register)

    app.post('/login',
    AuthenticationController.login)

    app.post('/lo',
    ProjetosController.login)

    app.get('/filtro/:filtragem',
    ProjetosController.filtro)

    app.get('/destaque',
    ProjetosController.destaque)

    app.get('/recentes',
    ProjetosController.recentes)

    app.get('/pesquisa',
    ProjetosController.pesquisa)

    app.get('/projetos',
    ProjetosController.index)

    app.post('/enviaarquivo', 
    ProjetosController.post)
    
    app.delete('/apaga/:projetoId',
      ProjetosController.delete
    )

    app.post("/up", multer(multerConfig).single("file"), async (req, res) => {
        const { originalname: name, size, key, location: url = "" } = req.file;
      
        
      
        return res.send(url);
      });

      app.post("/arquivo", multer(multerConfigArquivo).single("file"), async (req, res) => {
        const { originalname: name, size, key, location: url = "" } = req.file;
      
        
      
        return res.send(url);
      });
    
      app.get("/denunciar",
      DenunciaController.show)


    
}