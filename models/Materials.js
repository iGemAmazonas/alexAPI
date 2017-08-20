export default (sequelize, DataType) => {
  const Materials = sequelize.define('Materials', {
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

  Materials.associate = (models) => {
    sequelize.define('ProtocolMaterials', {
      quantity: {
        type: DataType.INTEGER,
      },
    }, { timestamps: false });
    models.Materials.belongsToMany(models.Protocols, { through: 'ProtocolMaterials' });
    models.Protocols.belongsToMany(models.Materials, { through: 'ProtocolMaterials' });
  };

  return Materials;
};
