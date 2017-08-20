export default (sequelize, DataType) => {
  const Comments = sequelize.define('Comments', {
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

  Comments.associate = (models) => {
    // 1:1 -> a Comment may be a replyOf another Comment
    models.Comments.hasOne(models.Comments, { as: 'replyOf' });
    // 1:N -> a Comment has a User (creator) and a User may have many Comments
    models.Comments.belongsTo(models.Users, { as: 'creator' });
    models.Users.hasMany(models.Comments, { foreignKey: 'creator_id' });
    // 1:N -> a Comment can be a Protocol Comment and Protocol can have many Comments
    models.Comments.belongsTo(models.Protocols, { through: 'ProtocolComments' });
    models.Protocols.belongsToMany(models.Comments, { through: 'ProtocolComments' });
  };

  return Comments;
};
