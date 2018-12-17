module.exports = class AdditionalFunctionsForDB {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async up() {
        const t = await this.sequelize.transaction();
        try {
            await this.sequelize.query(`
                CREATE OR REPLACE FUNCTION driving_school.find_students(student_name VARCHAR)
                RETURNS TABLE (st_name VARCHAR, surname VARCHAR, date DATE, group_name VARCHAR) AS
                $$
                DECLARE
                    temp_student driving_school.students%ROWTYPE;
                    temp_group driving_school.groups%ROWTYPE;
                BEGIN
                    CREATE TEMP TABLE IF NOT EXISTS temp_table(
						st_name VARCHAR,
						surname VARCHAR,
                        date DATE,  
                        group_name VARCHAR
                    );
                    SELECT INTO temp_student * FROM driving_school.students WHERE name = student_name;
                    IF temp_student IS NULL THEN
                        RAISE 'Such films does\`nt exist: %', student_name USING ERRCODE = '23505';
                    END IF;
                    SELECT INTO temp_group * FROM driving_school.groups WHERE id = temp_student.gr_id;
                    INSERT INTO temp_table(st_name, surname, date, group_name) 
                            VALUES(
								temp_student.name, 
                                temp_student.surname,
                                temp_student.date,
                                temp_group.name
							);
                    RETURN QUERY
                    SELECT * FROM temp_table;
                    DROP TABLE IF EXISTS temp_table;
                END;
                $$  
                LANGUAGE plpgsql
                RETURNS NULL ON NULL INPUT;`,
                { transaction: t }
            );

            // commit
            await t.commit();

        } catch (err) {
            // Rollback transaction if any errors were encountered
            console.log(err);
            await t.rollback();
        }
    }


    async down() {
        const t = await this.sequelize.transaction();
        try {

            await this.sequelize.query(
                `DROP FUNCTION IF EXISTS driving_school.find_students;`,
                { transaction: t }
            );

            // commit
            await t.commit();

        } catch (err) {
            // Rollback transaction if any errors were encountered
            console.log(err);
            await t.rollback();
        }
    }


    async findActorsByFilmAndSex(student_name, sex) {
        return (await this.sequelize.query(
            `SELECT * from driving_school.find_students('${student_name}', '${sex}');`,
            { raw: true }))[0];
    }

}
