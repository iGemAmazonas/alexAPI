export default (sequelize, DataType) => {
  const Authors = sequelize.define('Authors', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoincrement: true,
    },
    names: {
      type: DataType.STRING,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
    article_title: {
      type: DataType.STRING,
      validade: {
        notEmpty: true,
      },
    },
    article_link: {
      type: DataType.STRING,
      validade: {
        notEmpty: true,
      },
    },
  }, { timestamps: false });

  Authors.associate = (models) => {
    // 1:1 -> Creates protocol_id attribute in Authors table
    // Define add/get/set/has Protocol methods in an author instance
    // Define add/get/set/has Author methods in a protocol instance
    models.Authors.belongsTo(models.Protocols);
    models.Protocols.hasOne(models.Authors);
  };

  return Authors;
};
