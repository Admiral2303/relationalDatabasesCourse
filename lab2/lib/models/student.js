
const seatchCriteria = ['description'];

module.exports = function(sequelize, Sequelize, Groups) {
 
	let Student = sequelize.define('students', {
	name: {
		type: Sequelize.STRING,
		notEmpty: true
	},
	surname: {
		type: Sequelize.STRING,
		notEmpty: true
	},
    date: {
      type: Sequelize.DATE,
      notEmpty: true
    },
	sex: {
		type: Sequelize.ENUM('male', 'female'),
		notEmpty: true
	},
	description: Sequelize.TEXT,
	driving_license: {
		type: Sequelize.BOOLEAN,
		notEmpty: true
	}/*,
    gr_id: {
      type: Sequelize.INTEGER,
      notEmpty: true
    }*/
  });
  
	Student.associate = () => {
		 	Student.belongsTo(Groups, {
			foreignKey: {
					name: 'gr_id',
					allowNull: false
			},
			onDelete: 'RESTRICT',
			onUpdate: 'CASCADE'
		})
	};

	Student.up = async () => {
        const t = await sequelize.transaction();
        try {
            await sequelize.query(
                `ALTER TABLE driving_school.students ADD COLUMN IF NOT EXISTS tsv TSVECTOR;`,
                { transaction: t }
            );

            await sequelize.query(
                `CREATE INDEX IF NOT EXISTS student_search ON driving_school.students USING GIN(tsv);`,
                { transaction: t }
            );

            await sequelize.query(`
                CREATE TRIGGER students_vector_update
                BEFORE INSERT OR UPDATE ON driving_school.students
                FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger(tsv, 'pg_catalog.english', ${seatchCriteria.join(', ')});`,
                { transaction: t }
            );

            await sequelize.query(`
                CREATE OR REPLACE FUNCTION driving_school.generate_data_function() RETURNS trigger AS
                $$
                DECLARE
                    studentsCount integer;
                    defaultStudentsCount CONSTANT integer = 10;
                    group driving_school.groups%ROWTYPE;
                    counter INTEGER = 0;
                    group_id INTEGER = -1;
                BEGIN
                    FOR group_id IN SELECT id FROM driving_school.groups LOOP
                    SELECT INTO studentsCount count(*) FROM driving_school.students WHERE gr_id = group_id;
                        IF studentsCount < defaultStudentsCount THEN
                            LOOP 
                                EXIT WHEN counter = 10; 
                                counter := counter + 1 ; 
                                INSERT INTO driving_school.students (name, surname, date, sex, driving_license, description, gr_id) 
                                VALUES(md5(random()::text), md5(random()::text), CURRENT_DATE,'male',false,md5(random()::text), group_id);
                            END LOOP; 
                        END IF;
                    END LOOP;
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;`,
                { transaction: t }
            );
            

            await sequelize.query(`
                CREATE TRIGGER generate_data_trigger
                AFTER INSERT 
                ON driving_school.students
                FOR EACH ROW
                EXECUTE PROCEDURE driving_school.generate_data_function();`,
                { transaction: t }
            );

            // // commit
            await t.commit();

        } catch (err) {
            // Rollback transaction if any errors were encountered
            console.log(err);
            await t.rollback();
        }
    }

    Student.down = async () => {
        const t = await sequelize.transaction();
        try {

           
            await sequelize.query(
                `DROP TRIGGER IF EXISTS generate_data_trigger ON driving_school.students;`,
                { transaction: t }
            );



        //     // commit
            await t.commit();

        } catch (err) {
            // Rollback transaction if any errors were encountered
            console.log(err);
            await t.rollback();
        }
    }

	return Student;

}