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

    app.get('/pesquisa/:search',
    ProjetosController.pesquisa)

    app.get('/projetos',
    ProjetosController.index)

    app.get('/projetos/:id',
    ProjetosController.index2)

    app.post('/enviaarquivo', 
    ProjetosController.post)
    
    app.delete('/apaga/:projetoId',
      ProjetosController.delete
    )
    app.delete('/deletadenuncia/:id',
      DenunciaController.delete
    )

    app.post("/up", multer(multerConfig).single("file"), async (req, res) => {
        const { originalname: name, size, key, location: url = "" } = req.file;
      
        
      
        return res.json({url});
      });

      app.post("/arquivo", multer(multerConfigArquivo).single("file"), async (req, res) => {
        const { originalname: name, size, key, location: url = "" } = req.file;
      
        
      
        return res.json({url});
      });
    
      app.get("/denunciar",
      DenunciaController.show)

      app.get("/conta/:numero",
      DenunciaController.conta)

      app.put("/aprova/:id",
      ProjetosController.aprova)


    
}
