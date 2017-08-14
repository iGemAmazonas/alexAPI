export default (sequelize, DataType) => {
  const Material = sequelize.define('Material', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoincrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
    description: {
      type: DataType.STRING,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
  });

  Material.associate = (models) => {
    sequelize.define('ProtocolMaterial', {
      quantity: {
        type: DataType.INTEGER,
      },
    });
    models.Material.belongsToMany(models.Protocol, { through: 'ProtocolMaterial' });
    models.Protocol.belongsToMany(models.Material, { through: 'ProtocolMaterial' });
  };

  return Material;
};
