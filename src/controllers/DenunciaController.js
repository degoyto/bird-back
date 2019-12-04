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
  },
}