export default (sequelize, DataType) => {
  const Projects = sequelize.define('Projects', {
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

  Projects.associate = (models) => {
    sequelize.define('ProjectParticipants', {
      role: {
        type: DataType.ENUM,
        values: ['admin', 'creator', 'editor', 'reader'],
        default: 'creator',
      },
    });
    // N:M -> A project has many participants, and a participant may have many projects
    models.Projects.belongsToMany(models.Users, { through: 'ProjectParticipants' });
    models.Users.belongsToMany(models.Projects, { through: 'ProjectParticipants' });
    // 1:N -> A project has one creator and a user may have many projects
    models.Projects.belongsTo(models.Users, { as: 'creator' });
    models.Users.hasMany(models.Projects, { foreignKey: 'creatorId' });
  };

  return Projects;
};
