export default (sequelize, DataType) => {
  const Experiments = sequelize.define('Experiments', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
    description: {
      type: DataType.TEXT,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
  });

  Experiments.associate = (models) => {
    // 1:N -> A project has one creator and a user may have many projects
    models.Experiments.belongsTo(models.Users, { as: 'Creator' });
    models.Users.hasMany(models.Experiments, { foreignKey: 'CreatorId' });
    // 1:N -> An experiment is part of a project and a project may have many experiments
    models.Experiments.belongsTo(models.Projects);
    models.Projects.hasMany(models.Experiments);
  };

  return Experiments;
};
