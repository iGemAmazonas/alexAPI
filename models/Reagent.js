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

  Reagent.associate = (Models) => {
    Reagent.belongsToMany(Models.Protocol, {
      through: {
        model: 'Protocol_Reagent',
      },
    });
  };

  return Reagent;
};
