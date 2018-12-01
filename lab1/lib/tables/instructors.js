let Connect = require('../connect');
let connect = new Connect('postgres', 5555, 'driving_school', 'driving_school');
let db = connect.getDatabase();



class Instructors {
  constructor(tableName = 'instructors') {
    this.table = tableName;
  }

  getAllInstructors() {
    return db.query('SELECT $1:name FROM $2:name', ['*', this.table]);
  };

  getInstructorById(id) {
    return db.query('SELECT $1:name FROM $2:name WHERE _id=$3 ', ['*', this.table, id]);
  }

  getInstructorsByNameAndSurname(name, surname) {
    return db.query('SELECT $1:name FROM $2:name WHERE name=$3 AND surname=$4', ['*', this.table, name, surname]);
  }

  getInstructorsByNameAndSex(name, sex) {
    return db.query('SELECT $1:name FROM $2:name WHERE name=$3 AND sex=$4', ['*', this.table, name, sex]);
  }

  async generateData(drivingSchoolTable){
    let driving_schools = await db.query('SELECT $1:name FROM $2:name', ['*', drivingSchoolTable]);
    for(let el of driving_schools){
      await db.query('INSERT INTO $1:name (name, surname, date, sex, drs_id) VALUES\
       (md5(random()::text), md5(random()::text), CURRENT_DATE -(random() * (CURRENT_DATE -\'27.11.1950\'))::int,\
        (\'{male,female}\'::sexs[])[ceil(random() *2)] ,$2)', [this.table,el._id]);
    }
    console.log("Data generated");
  }

  insertInstructor(instrucorObj) {
    return db.query('INSERT INTO $1:name (name, surname, date, sex, drs_id) VALUES ($2,$3,$4,$5,$6)', [this.table,
      instrucorObj.name, instrucorObj.surname, instrucorObj.date, instrucorObj.sex, instrucorObj.drs_id
    ]);
  }

  updateInstructorbyId(id, instrucorObj) {
    return db.query('UPDATE $1:name SET name=$2, surname=$3, date=$4,sex=$5 WHERE _id=$6', [this.table,
      instrucorObj.name, instrucorObj.surname, instrucorObj.date, instrucorObj.sex, id
    ]);
  }

  deleteById(id) {
    return db.query('DELETE FROM $1:name WHERE _id=$2', [this.table, id])
  }

  deleteByNameAndSurname(name, surname) {
    return db.query('DELETE FROM $1:name WHERE name=$2 AND surname=$3', [this.table, name, surname])
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