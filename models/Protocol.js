export default (sequelize, DataType) => {
  const Protocol = sequelize.define('Protocol', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoincrement: true,
    },
    title: {
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
    authors: {
      type: DataType.STRING,
    },
    steps: {
      type: DataType.STRING,
    },
    keywords: {
      type: DataType.STRING,
    },
  });

  Protocol.associate = (Models) => {
    Protocol.hasMany(Models.Reagent, {
      through: {
        model: 'Protocol_Reagent',
      },
      quantity: 0,
    });
    Protocol.hasMany(Models.Material, {
      through: {
        model: 'Protocol_Material',
      },
      quantity: 0,
    });
    Protocol.hasMany(Models.Comment);
  };

  return Protocol;
};
