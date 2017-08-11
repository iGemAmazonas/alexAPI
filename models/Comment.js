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
    Comment.hasOne(models.Comment, { as: 'reply' });
    Comment.belongsTo(models.User);
  };

  return Comment;
};
