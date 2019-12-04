const {Denuncia} = require('../models')
const Sequelize = require("sequelize")
module.exports = {
  async register (req, res) {
    try {    
      const denuncia = await Denuncia.create(req.body)
      console.log(req.file)
      res.send(denuncia)
      
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  async show (req, res) {
    try {
      const denuncia = await Denuncia.findAll()
      res.send(denuncia)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the songs'
      })
    }
  },async delete (req, res) {
    const idzinho= req.params.id
    console.log(idzinho)
    try {
      
      const projeto = await Denuncia.destroy({
        where: {
            projetoid:idzinho
        }
    })
      
      
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  },  
  async conta (req, res) {
    const numero = req.params.numero
    const Op = Sequelize.Op;
    const denuncia ={total:null}
    try {
      denuncia.total = await Denuncia.count({
        where:{ projetoid: numero,
        }
      })
      
      res.send(denuncia)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the songs'
      })
    }
  },




  
}