export default (sequelize, DataType) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoincrement: true,
    },
    text: {
      type: DataType.TEXT,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
  });

  Comment.associate = (models) => {
    models.Comment.hasOne(models.Comment, { as: 'reply' });
    models.Comment.belongsTo(models.User, { as: 'creator' });
    models.User.hasMany(models.Comment, { as: 'comments', foreignKey: 'creator_id' });
    models.Comment.belongsTo(models.Protocol, { through: 'ProtocolComment' });
    models.Protocol.belongsToMany(models.Comment, { through: 'ProtocolComment' });
  };

  return Comment;
};
