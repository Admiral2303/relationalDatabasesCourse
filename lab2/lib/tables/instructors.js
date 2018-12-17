// let Connect = require('../connect');
// let connect = new Connect('postgres', 5555, 'driving_school', 'driving_school');
// let db = connect.getDatabase();



class Instructors {
  constructor(model) {
    this.model = model; 
  }

  async getAllInstructors() {
    return await this.model.findAll({raw: true});
    
  };

  async getInstructorById(id) {
    return await this.model.findOne({where: {id:id}, raw: true});
  }

  async getInstructorsByNameAndSurname(name, surname) {
    return await this.model.findOne({name:name, surname: surname});
  }

  async getInstructorsByNameAndSex(name, sex) {
    return await this.model.findOne({name:name, sex: sex});

    return db.query('SELECT $1:name FROM $2:name WHERE name=$3 AND sex=$4', ['*', this.table, name, sex]);
  }

  async generateData(drivingSchoolTable){
    let driving_schools = await this.sequelize.query('SELECT $1:name FROM $2:name', ['*', drivingSchoolTable]);
    for(let el of driving_schools){
      await this.sequelize.query('INSERT INTO $1:name (name, surname, date, sex, drs_id) VALUES\
       (md5(random()::text), md5(random()::text), CURRENT_DATE -(random() * (CURRENT_DATE -\'27.11.1950\'))::int,\
        (\'{male,female}\'::sexs[])[ceil(random() *2)] ,$2)', [this.table,el._id]);
    }
    console.log("Data generated");
  }

  async insertInstructor(instrucorObj) {
    return await this.model.create(
      {
        name: instrucorObj.name,
        surname: instrucorObj.surname,
        date: instrucorObj.date,
        sex: instrucorObj.sex,
        drs_id: instrucorObj.drs_id
      });
  }

  async updateInstructorbyId(id, instrucorObj) {
    return await this.model.update(
      {
        name: instrucorObj.name,
        surname: instrucorObj.surname,
        date: instrucorObj.date,
        sex: instrucorObj.sex,
        drs_id: instrucorObj.drs_id
      }, 
      { 
        where: {
          id: id
        }
      });
  }

  async deleteById(id) {
    return await this.model.destroy({
      where: {
        id: id
      }
    });
  }

  async deleteByNameAndSurname(name, surname) {
    return await this.model.destroy({
      where: {
        name: name,
        surname: surname
      }
    });
  }

}

module.exports = Instructors;

// let ins = new Instructors();

// let instrucorObject = {
//   name: 'Bddssd',
//   surname: 'SADSADsd',
//   date: 2018,
//   sex: 'male',
//   drs_id: 1
// }
// ins.generateData('driving_schools')
//   .then(() => {})


// ins.insertInstructor(instrucorObject)
//   .then(() => {
//     ins.getAllInstructors()
//       .then((data) => console.log(data))
//   })
// ins.getInstructorsByNameAndSex('Bddssd', 'men')
//   .then(data => console.log(data));