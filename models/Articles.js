export default (sequelize, DataType) => {
  const Articles = sequelize.define('Articles', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoincrement: true,
    },
    authors: {
      type: DataType.STRING,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
    title: {
      type: DataType.STRING,
      defaultValue: 'Unknown',
      validade: {
        notEmpty: true,
      },
    },
    link: {
      type: DataType.STRING,
      validade: {
        notEmpty: true,
      },
    },
  }, { timestamps: false });

  Articles.associate = (models) => {
    // 1:1 -> Creates protocol_id attribute in Articles table
    // Define add/get/set/has Protocol methods in an articles instance
    // Define add/get/set/has Articles methods in a protocol instance
    models.Articles.belongsTo(models.Protocols, { as: 'protocol' });
    models.Protocols.hasOne(models.Articles, { foreignKey: 'protocolId' });
  };

  return Articles;
};
