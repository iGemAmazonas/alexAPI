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
    // 1:1 -> a Comment may be a replyOf another Comment
    models.Comment.hasOne(models.Comment, { as: 'replyOf' });
    // 1:N -> a Comment has a User (creator) and a User may have many Comments
    models.Comment.belongsTo(models.User, { as: 'creator' });
    models.User.hasMany(models.Comment, { foreignKey: 'creator_id' });
    // 1:N -> a Comment can be a Protocol Comment and Protocol can have many Comments
    models.Comment.belongsTo(models.Protocol, { through: 'ProtocolComment' });
    models.Protocol.belongsToMany(models.Comment, { through: 'ProtocolComment' });
  };

  return Comment;
};
