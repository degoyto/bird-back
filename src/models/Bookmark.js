module.exports = (sequelize, DataTypes) => {
    const Bookmark = sequelize.define('Bookmark', {})
        Bookmark.associate = function(models){
            Bookmark.belongsTo(models.user)
            Bookmark.belongsTo(models.projetos)
        }
        return Bookmark
      }