export default (sequelize, DataType) => {
  const Materials = sequelize.define('Materials', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      validade: {
        notEmpty: true,
      },
    },
  });

  Materials.associate = (models) => {
    // N:M -> Creates join table with ProtocolId and MaterialId
    // Define add/get/set/has Protocols methods in an material instance
    // Define add/get/set/has Materials methods in a protocol instance
    models.Materials.belongsToMany(models.Protocols, { through: 'ProtocolMaterials' });
    models.Protocols.belongsToMany(models.Materials, { through: 'ProtocolMaterials' });
  };

  return Materials;
};
