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

  Comment.associate = (Models) => {
    Comment.belongsTo(Models.Protocol);
    Comment.belongsTo(Models.User);
    Comment.hasOne(Models.Comment, { as: 'Reply' });
  };

  return Comment;
};
