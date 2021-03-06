const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
const aws = require("aws-sdk")

const s3 =  new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
});

function hashPassword (proj, options) {
  const SALT_FACTOR = 8

  if (!proj.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(proj.password, salt, null))
    .then(hash => {
      proj.setDataValue('password', hash)
    })
}


module.exports = (sequelize, DataTypes) => {
  const Projeto = sequelize.define('Projeto', {
    title:DataTypes.STRING,
    conteudo: DataTypes.TEXT,
    type: DataTypes.STRING,
    fotoUrl: DataTypes.STRING,
    tipo: DataTypes.STRING,
    autor: DataTypes.STRING,
    semestre: DataTypes.STRING,
    tags: DataTypes.TEXT,
    email: DataTypes.STRING,
    disciplina: DataTypes.STRING,
    visto: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    arquivo: DataTypes.STRING,
    password: DataTypes.STRING,
    novo: DataTypes.STRING,
    tipagem: {
      type: DataTypes.STRING(50),
      allowNull: true
    } 
  },
    
    {
      hooks: {
        
        
        beforeSave: hashPassword
      }
    })

    Projeto.prototype.comparePassword = function (password) {
      return bcrypt.compareAsync(password, this.password)
    }
    
  return Projeto
}



   


