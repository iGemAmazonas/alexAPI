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
    sequelize.define('Protocol_Reagent', {
      quantity: {
        type: DataType.INTEGER,
      },
      unit: {
        type: DataType.STRING,
      },
    });
    Reagent.belongsToMany(models.Protocol, { through: 'Protocol_Reagent' });
    models.Protocol.belongsToMany(Reagent, { through: 'Protocol_Reagent' });
  };

  return Reagent;
};
