export default (sequelize, DataType) => {
  const Reagents = sequelize.define('Reagents', {
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
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
  });

  Reagents.associate = (models) => {
    sequelize.define('ProtocolReagents', {
      quantity: {
        type: DataType.FLOAT,
        allowNull: false,
        validade: {
          notEmpty: true,
        },
      },
      unit: {
        type: DataType.ENUM,
        values: ['uL', 'mL', 'L', 'mg', 'g', 'kg'],
        allowNull: false,
        validade: {
          notEmpty: true,
        },
      },
    }, { timestamps: false });
    // N:M -> Creates join table with protocols_id and reagents_id
    // Define add/get/set/has Protocols methods in an reagent instance
    // Define add/get/set/has Reagents methods in a protocol instance
    models.Reagents.Protocols = models.Reagents.belongsToMany(models.Protocols, { through: 'ProtocolReagents' });
    models.Protocols.Reagents = models.Protocols.belongsToMany(models.Reagents, { through: 'ProtocolReagents' });
  };

  return Reagents;
};
