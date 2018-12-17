module.exports = function(sequelize, Sequelize) {
  let DrivingSchool = sequelize.define('driving_schools', {
    name: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    groups_count: {
      type: Sequelize.INTEGER,
      notEmpty: true
    }
  });
  return DrivingSchool;
}
