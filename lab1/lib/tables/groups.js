let Connect = require('../connect');
let connect = new Connect('postgres', 5555, 'driving_school', 'driving_school');
let db = connect.getDatabase();

class Groups {
  constructor(tableName = 'groups') {
    this.table = tableName;
  }

  getAllGroups() {
    return db.query('SELECT $1:name FROM $2:name', ['*', this.table]);
  };

  async generateData(instructorsTable){
    let instructors = await db.query('SELECT $1:name FROM $2:name', ['*', instructorsTable]);
    // instructors.forEach(async (el) => {
      for(let el of instructors){
        await db.query('INSERT INTO $1:name (name, max_count, ins_id) VALUES (md5(random()::text), random()::int,$2)', [this.table,el._id]);
      }
    console.log("Data generated");
  }

  getGroupById(id) {
    return db.query('SELECT $1:name FROM $2:name WHERE _id=$3 ', ['*', this.table, id]);
  }

  getGroupByName(name) {
    return db.query('SELECT $1:name FROM $2:name WHERE name=$3', ['*', this.table, name]);
  }

  insertGroup(groupObj) {
    return db.query('INSERT INTO $1:name (name,max_count,ins_id) VALUES ($2,$3,$4)', [this.table,
      groupObj.name, groupObj.max_count, groupObj.ins_id
    ]);
  }

  updateGroupbyId(id, groupObj) {
    return db.query('UPDATE $1:name SET name=$2, max_count=$3 WHERE _id=$4', [this.table,
      groupObj.name, groupObj.max_count, id
    ]);
  }

  deleteById(id) {
    return db.query('DELETE FROM $1:name WHERE _id=$2', [this.table, id])
  }

  deleteByName(name) {
    return db.query('DELETE FROM $1:name WHERE name=$2', [this.table, name])
  }

  addInstructorToGroup(id, instructorId) {
    return db.query('UPDATE $1:name SET instructor_id=$2 WHERE _id=$3', [this.table, studentId, id])
  }

  // addStudentToInstructor(id, studentId) {
  //   return db.query('UPDATE $1:name SET students_id=array_append(students_id, $2) WHERE _id=$3', [this.table, studentId, id])
  // }
}

module.exports = Groups;

// let ins = new Groups();

// ins.generateData('instructors')
//   .then(()=> {})

// let instrucorObject = {
//   name: '3',
//   max_count: 20,
//   ins_id: 1
// }

// ins.insertGroup(instrucorObject)
//   .then(() => {
//     ins.getAllGroups()
//       .then(data => console.log(data));
//   })

