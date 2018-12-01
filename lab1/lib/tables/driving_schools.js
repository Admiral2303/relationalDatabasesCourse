let Connect = require('../connect');
let connect = new Connect('postgres', 5555, 'driving_school', 'driving_school');
let db = connect.getDatabase();


class DrivingSchools {

  constructor(tableName = 'driving_schools') {
    this.table = tableName;
  }

  getAllDrivingSchools() {
    return db.query('SELECT $1:name FROM $2:name', ['*', this.table]);
  };

  getDrivingSchoolById(id) {
    return db.query('SELECT $1:name FROM $2:name WHERE _id=$3 ', ['*', this.table, id]);
  }

  generateData(){
    return db.query('INSERT INTO $1:name (groups_count, name) SELECT i, md5(random()::text)\
     FROM generate_series(1, 100) AS i;', [this.table]);
  }

  getDrivingSchoolByName(schoolName) {
    return db.query('SELECT $1:name FROM $2:name WHERE name=$3 ', ['*', this.table, schoolName]);
  }

  insertDrivingSchool(schoolName,groups_count) {
    return db.query('INSERT INTO $1:name (name, groups_count) VALUES ($2, $3)', [this.table, schoolName, groups_count])
  }

  updateDrivingSchoolbyName(schoolName, newSchoolname, groups_count) {
    return db.query('UPDATE $1:name SET name=$2 WHERE name=$3, groups_count=$4', [this.table, newSchoolname, schoolName, groups_count])
  }

  updateDrivingSchoolbyId(id, newSchoolname, groups_count) {
    return db.query('UPDATE $1:name SET name=$2, groups_count=$3 WHERE _id=$4', [this.table, newSchoolname,groups_count, id])
  }

  deleteById(id) {
    return db.query('DELETE FROM $1:name WHERE _id=$2', [this.table, id])
  }

  deleteByName(name) {
    return db.query('DELETE FROM $1:name WHERE name=$2', [this.table, name])
  }
}

module.exports = DrivingSchools;


// let drSc = new DrivingSchools();

// drSc.generateData()
//   .then(data => console.log(data));

// drSc.insertDrivingSchool('sadsad')
// .then(() => {
//   drSc.getAllDrivingSchools()
//   .then(data => console.log(data))
// })

// drSc.addInstructorToSchool(3, 1)
//   .then(() => {
//     drSc.getAllDrivingSchools()
//       .then((data) => console.log(data));
//   })