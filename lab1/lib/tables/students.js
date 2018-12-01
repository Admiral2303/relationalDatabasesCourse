let Connect = require('../connect');
let connect = new Connect('postgres', 5555, 'driving_school', 'driving_school');
let db = connect.getDatabase();
let faker = require('faker');

class Students {
  constructor(tableName = 'students') {
    this.table = tableName;
  }

  getAllStudents() {
    return db.query('SELECT $1:name FROM $2:name', ['*', this.table]);
  };

  getStudentById(id) {
    return db.query('SELECT $1:name FROM $2:name WHERE _id=$3 ', ['*', this.table, id]);
  }

  // async generateData(groupsTable){
  //   let groups = await db.query('SELECT $1:name FROM $2:name', ['*', groupsTable]);
  //   groups.forEach(async (el) => {
  //     await db.query('INSERT INTO $1:name (name, surname, date, sex, driving_license, gr_id) VALUES\
  //      (md5(random()::text), md5(random()::text), CURRENT_DATE -(random() * (CURRENT_DATE -\'27.11.1950\'))::int,\
  //       (\'{male,female}\'::sexs[])[ceil(random() *2)],cast(cast(random() as integer) as boolean),$2)',
  //        [this.table,el._id]);
  //   });
  //   console.log("Data generated");
  // }

  async generateData(groupsTable){
    let nameAndSurname = faker.name.findName().split(' ');
    let groups = await db.query('SELECT $1:name FROM $2:name', ['*', groupsTable]);
    for(let el of groups){
      await db.query('INSERT INTO $1:name (name, surname, date, sex, driving_license, description, gr_id) VALUES\
       ($2,$3, $4,(\'{male,female}\'::sexs[])[ceil(random() *2)],cast(cast(random() as integer) as boolean),$5,$6)',
         [this.table, nameAndSurname[0], nameAndSurname[1],faker.date.past(),faker.lorem.text(), el._id]);
    }
    console.log("Data generated");
  }

  getStudentAndGroup(sex, driving_license){
    return db.query('SELECT s._id, s.name, s.date, s.driving_license, g.max_count FROM $1:name s\
     JOIN groups g ON s.gr_id=g._id AND s.sex=$2 AND s.driving_license=$3',
     [this.table, sex, driving_license])
  }

  getStudentByNameAndSurname(name, surname) {
    return db.query('SELECT $1:name FROM $2:name WHERE name=$3 AND surname=$4', ['*', this.table, name, surname]);
  }

  insertStudent(studentObj) {
    return db.query('INSERT INTO $1:name (name, surname, date, sex, description, driving_license, gr_id) VALUES ($2,$3,$4,$5,$6,$7,$8)', [this.table,
      studentObj.name, studentObj.surname, studentObj.date, studentObj.sex, studentObj.description, studentObj.driving_license, studentObj.gr_id
    ]);
  }

  updateStudentbyId(id, studentObj) {
    return db.query('UPDATE $1:name SET name=$2, surname=$3, date=$4,sex=$5, description=$6 WHERE _id=$6', [this.table,
      studentObj.name, studentObj.surname, studentObj.date, studentObj.sex, studentObj.description, id
    ]);
  }

  deleteById(id) {
    return db.query('DELETE FROM $1:name WHERE _id=$2', [this.table, id])
  }

  deleteByNameAndSurname(name, surname) {
    return db.query('DELETE FROM $1:name WHERE name=$2 AND surname=$3', [this.table, name, surname])
  }

  addGroupToInstructor(id, groupId) {
    return db.query('UPDATE $1:name SET group_id=$2 WHERE _id=$3', [this.table, groupId, id])
  }

  findPhrase(phrase) {
    return db.query(`SELECT name, surname, date,sex, ts_headline(description, q) 
        FROM students, phraseto_tsquery($1) q WHERE to_tsvector(description) @@ q;`,[phrase]);
  }

  findWords (words) {
    return db.query(`SELECT name,surname, date,sex, ts_headline(description, q) 
        FROM students, to_tsquery('$1^') q WHERE to_tsvector(description) @@ q;`,
        words.map(word => '!' + word).join(' & '))
  }
}

module.exports = Students;
// console.log(faker.date.past())
// let stud = new Students();

// stud.findPhrase('asd adad')
//   .then((data) => console.log(data))

// stud.getStudentAndGroup('male', true)
//   .then(data => console.log(data))



  
// let instrucorObject = {
//   name: '3fgfg',
//   surname: '10',
//   date: 2017,
//   sex: 'male',
//   driving_license: false,
//   gr_id: 1,
// };

// ins.insertStudent(instrucorObject)
//   .then(() => {
//     ins.getAllStudents()
//       .then((data) => console.log(data))
//   })