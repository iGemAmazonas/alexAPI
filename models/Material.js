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

  Material.associate = (Models) => {
    Material.belongsToMany(Models.Protocol, {
      through: {
        model: 'Protocol_Material',
      },
    });
  };

  return Material;
};
