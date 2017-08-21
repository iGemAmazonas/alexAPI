export default (sequelize, DataType) => {
  const Experiments = sequelize.define('Experiments', {
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
      type: DataType.TEXT,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
  });

  Experiments.associate = (models) => {
    sequelize.define('ExperimentParticipants', {
      role: {
        type: DataType.INTEGER,
      },
    });    
    // N:M -> Creates join table with protocols_id and keywords_id
    // Define add/get/set/has Protocols methods in an keyword instance
    // Define add/get/set/has Keywords methods in a protocol instance
    models.Experiments.belongsToMany(models.Users, { through: 'ExperimentParticipants' });
    models.Users.belongsToMany(models.Experiments, { through: 'ExperimentParticipants' });
    // 1:N -> A project has one creator and a user may have many projects
    models.Experiments.belongsTo(models.Users, { as: 'creator' });
    models.Users.hasMany(models.Experiments, { foreignKey: 'creator_id' });
    // 1:N -> An experiment is part of a project and a project may have many experiments
    models.Experiments.belongsTo(models.Projects);
    models.Projects.hasMany(models.Experiments);
  };

  return Experiments;
};
