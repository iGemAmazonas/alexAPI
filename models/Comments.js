export default (sequelize, DataType) => {
  const Comments = sequelize.define('Comments', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoincrement: true,
    },
    text: {
      type: DataType.TEXT,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
  }, { timestamps: false });

  Comments.associate = (models) => {
    // 1:1 -> Creates replyOf_id attribute in Comments table from parent Comment
    // Define add/get/set/has ReplyOf methods in an comment instance
    models.Comments.hasOne(models.Comments, { as: 'replyOf' });
    // 1:N -> a Comment has a User (creator) and a User may have many Comments
    models.Comments.belongsTo(models.Users, { as: 'creator' });
    models.Users.hasMany(models.Comments, { foreignKey: 'creatorId' });
    // 1:N -> a Comment can be a Project Comment and Project can have many Comments
    models.Comments.belongsTo(models.Projects, { through: 'ProjectComments' });
    models.Projects.belongsToMany(models.Comments, { through: 'ProjectComments' });
    // 1:N -> a Comment can be a Experiment Comment and Experiment can have many Comments
    models.Comments.belongsTo(models.Experiments, { through: 'ExperimentComments' });
    models.Experiments.belongsToMany(models.Comments, { through: 'ExperimentComments' });
    // 1:N -> a Comment can be a Protocol Comment and Protocol can have many Comments
    models.Comments.belongsTo(models.Protocols, { through: 'ProtocolComments' });
    models.Protocols.belongsToMany(models.Comments, { through: 'ProtocolComments' });
    // 1:N -> a Comment can be a Step Comment and Step can have many Comments
    models.Comments.belongsTo(models.Steps, { through: 'StepComments' });
    models.Steps.belongsToMany(models.Comments, { through: 'StepComments' });
  };

  return Comments;
};
