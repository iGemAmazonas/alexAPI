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
    sequelize.define('Protocol_Material', {
      quantity: {
        type: DataType.INTEGER,
      },
      unit: {
        type: DataType.STRING,
      },
    });
    Material.belongsToMany(models.Protocol, { through: 'Protocol_Material' });
    models.Protocol.belongsToMany(Material, { through: 'Protocol_Material' });
  };

  return Material;
};
