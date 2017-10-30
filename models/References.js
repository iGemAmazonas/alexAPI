export default (sequelize, DataType) => {
  const References = sequelize.define('References', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  });

  References.associate = (models) => {
    // N:M -> Creates join table with ProtocolId and ReferenceId
    // Define add/get/set/has Protocols methods in an reference instance
    // Define add/get/set/has References methods in a protocol instance
    models.References.belongsToMany(models.Protocols, { through: 'ProtocolReferences' });
    models.Protocols.belongsToMany(models.References, { through: 'ProtocolReferences' });
  };

  return References;
};
