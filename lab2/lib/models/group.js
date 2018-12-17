module.exports = function(sequelize, Sequelize) {
	var Groups = sequelize.define('groups', {

		id: {
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
		},
		name: {
			type: Sequelize.STRING,
			notEmpty: true
		},
        max_count: {
            type: Sequelize.INTEGER,
			notEmpty: true
        },
		ins_id: {
			type: Sequelize.INTEGER,
			notEmpty: true
		}

	});

	return Groups;

}