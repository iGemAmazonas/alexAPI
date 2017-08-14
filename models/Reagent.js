export default (sequelize, DataType) => {
  const Reagent = sequelize.define('Reagent', {
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

  Reagent.associate = (models) => {
    sequelize.define('ProtocolReagent', {
      quantity: {
        type: DataType.INTEGER,
      },
      unit: {
        type: DataType.STRING,
      },
    });
    models.Reagent.belongsToMany(models.Protocol, { through: 'ProtocolReagent' });
    models.Protocol.belongsToMany(models.Reagent, { through: 'ProtocolReagent' });
  };

  return Reagent;
};
