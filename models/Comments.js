export default (sequelize, DataType) => {
  const Comments = sequelize.define('Comments', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    // 1:1 -> Creates replyOf_id attribute in Comments table from parent Comment
    // Define add/get/set/has ReplyOf methods in an comment instance
    models.Comments.hasOne(models.Comments, { as: 'ReplyOf' });
    // 1:N -> a Comment has a User (creator) and a User may have many Comments
    models.Comments.belongsTo(models.Users, { as: 'Creator' });
    models.Users.hasMany(models.Comments, { foreignKey: 'CreatorId' });
    // 1:N -> a Comment can be a Protocol Comment and Protocol can have many Comments
    models.Comments.belongsTo(models.Protocols, { through: 'ProtocolComments' });
    models.Protocols.belongsToMany(models.Comments, { through: 'ProtocolComments' });
  };

  return Comments;
};
