
module.exports = (sequelize, DataTypes) => {
  const Denuncia = sequelize.define('Denuncia', {
    projetoid: DataTypes.INTEGER,
    motivo: DataTypes.STRING,
    
    
  },
    )

    
  return Denuncia
}



   


