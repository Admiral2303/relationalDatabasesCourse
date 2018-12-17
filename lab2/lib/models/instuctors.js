module.exports = function(sequelize, Sequelize) {
	let Instructor = sequelize.define('instructors', {
		name: {
			type: Sequelize.STRING,
			notEmpty: true
		},
		surname: {
			type: Sequelize.STRING,
			notEmpty: true
		},
		sex: {
			type: Sequelize.ENUM('male', 'female'),
			notEmpty: true
    },
    date: {
      type: Sequelize.DATE,
      notEmpty: true
    },
		drs_id: {
			type: Sequelize.INTEGER,
			notEmpty: true
		}
	});

	return Instructor;

}