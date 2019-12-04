const {Projeto} = require('../models')
const Sequelize = require("sequelize")
module.exports = {
  async index (req, res) {
    try {
      const projeto = await Projeto.findAll({
               
      })
      
      res.send(projeto)
      
    } catch (err) {
      res.status(500).send({
        error: "Erro get"
      })
    }
  },
  async filtro (req, res) {
    try {
      console.log(req.params);
      console.log(req.query);

      const Op = Sequelize.Op;
      const nome = req.params.filtragem || '';
      const limite = parseInt(req.query.limit) || 15;
  
      var orderBy = [['createdAt', 'DESC']];
      
      if(req.query.tableColumn && req.query.orderby)
        orderBy = [[req.query.tableColumn, req.query.orderby]];
      
      var projeto = await Projeto.findAll({
          where: {
            [Op.or] : {
              tipo: nome,
              type: nome
            }
          },
          order: orderBy,
          limit: limite
        })
      
      res.send(projeto)  
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Erro get"
      })
    }
  },
  async destaque(req, res){
    try {
      const Op = Sequelize.Op;
      var limit = parseInt(req.query.limit) || 15;
      
      var data = await Projeto.findAll({
        where: {
          [Op.and]:{
            tipo: {
              [Op.not]: ['SOM', "DOCUMENTO"]
            }
          }
        },
        limit
      })

      res.send(data);
    }

    catch(err){
      res.status(500).send(err);
    }
  },
  async recentes(req,res){
    try {      
      var data = await Projeto.findAll({
        order: [['createdAt', 'desc']],
        limit : 10
      })

      res.send(data);
    }

    catch(err){
      res.status(500).send(err);
    }
  },
  async pesquisa (req,res){
    const Op = Sequelize.Op;
    const term = `%${req.query.term}%`;

    try {      
      var data = await Projeto.findAll({
        where:{
          [Op.or]:{
            [Op.like]: {
              title: term
            },
            [Op.like]: {
              tags: term
            }
          }          
        },
        order: [['createdAt', 'desc']],
        limit : 10
      })

      res.send(data);
    }

    catch(err){
      res.status(500).send(err);
    }
  },
  async show (req, res) {
    try {
      const projeto = await Projeto.findByPk(req.params.projetoId)
      res.send(projeto)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the songs'
      })
    }
  },
  async post (req, res) {
    try {
      console.log(req.body)
      const projeto = await Projeto.create(req.body)
     
      
      res.send(projeto)
      
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  },
  async login (req, res) {
    try {
      
      const {id, password} = req.body
      console.log(req.body)
      const proj = await Projeto.findOne({
        where: {
          id: id
        }
      })

      if (!proj) {
        return res.status(403).send({
          error: 'Email incorreto'
        })
      }

      const senhaValida = await proj.comparePassword(password)
      console.log(senhaValida)
      if (!senhaValida) {
        return res.status(403).send({
          error: 'Senha incorreta'
        })
      }
      const projJson = proj.toJSON()
      res.send({
        proj: projJson,
        
      })
    } catch (err) {
        
      res.status(500).send({
        error: 'An error has occured trying to log in'
        
      })
    }},
    async delete (req, res) {
      try {
        
        const projeto = await Projeto.findByPk(req.params.projetoId)
        await projeto.destroy()
        
      } catch (err) {
        res.status(500).send({
          error: err
        })
      }//
    },  
}


      // if (nome=="aplicativos"){
      //   const projeto = await Projeto.findAll({
      //     where: {
      //       tipo:'aplicativo'
      //       //[Op.or]: [{tipo: 'aplicativo'}]
      //     },
      //     order: [['createdAt', 'DESC']]
      //   })
      //   res.send(projeto)  
      // }

      // if (nome=="jogos"){
      //   const projeto = await Projeto.findAll({
      //     where: {
      //       tipo:'jogo'
      //       //[Op.or]: [{tipo: 'aplicativo'}]
      //     },
      //     order: [['createdAt', 'DESC']]
      //   })
      //   res.send(projeto)  
      // }

      // if (nome=="infograficos"){
      //   const projeto = await Projeto.findAll({
      //     where: {
      //       tipo:'infográfico'
      //       //[Op.or]: [{tipo: 'aplicativo'}]
      //     },
      //     order: [['createdAt', 'DESC']]
      //   })
      //   res.send(projeto)  
      // }
      // if (nome=="projetos"){
      //   const projeto = await Projeto.findAll({
      //     where: {
      //       type:'projeto'
      //       //[Op.or]: [{tipo: 'aplicativo'}]
      //     },
      //     order: [['createdAt', 'DESC']]
      //   })
      //   res.send(projeto)  
      // }
      // if (nome=="assets"){
      //   const projeto = await Projeto.findAll({
      //     where: {
      //       type:'asset'
      //       //[Op.or]: [{tipo: 'aplicativo'}]
      //     },
      //     order: [['createdAt', 'DESC']]
      //   })
      //   res.send(projeto)  
      // }

      // if (nome=="sprites"){
      //   const projeto = await Projeto.findAll({
      //     where: {
      //       tipo:'Sprites 2D'
      //       //[Op.or]: [{tipo: 'aplicativo'}]
      //     },
      //     order: [['createdAt', 'DESC']]
      //   })
      //   res.send(projeto)  
      // }
      // if (nome=="modelos3d"){
      //   const projeto = await Projeto.findAll({
      //     where: {
      //       tipo:'Modelos3D'
      //       //[Op.or]: [{tipo: 'aplicativo'}]
      //     },
      //     order: [['createdAt', 'DESC']]
      //   })
      //   res.send(projeto)  
      // }
      // if (nome=="sons"){
      //   const projeto = await Projeto.findAll({
      //     where: {
      //       tipo:'sons'
      //       //[Op.or]: [{tipo: 'aplicativo'}]
      //     },
      //     order: [['createdAt', 'DESC']]
      //   })
      //   res.send(projeto)  
      // }

      // if (nome=="documentos"){
      //   const projeto = await Projeto.findAll({
      //     where: {
      //       tipo:'documentos'
      //       //[Op.or]: [{tipo: 'aplicativo'}]
      //     },
      //     order: [['createdAt', 'DESC']]
      //   })
      //   res.send(projeto)  
      // }
      