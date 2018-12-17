let faker = require('faker');

class Students {
  constructor(model, sequelize) {
    this.model = model;
    this.sequelize = sequelize;
  }

  async getAllStudents() {
    return await this.model.findAll({raw: true});
  };

  async getStudentById(id) {
    return await this.model.findOne({where: {id:id}, raw: true});
  }


  async generateData(groupsTable){
    let nameAndSurname = faker.name.findName().split(' ');
    let groups = await this.sequelize.query('SELECT $1:name FROM $2:name', ['*', groupsTable]);
    for(let el of groups) {
      await this.sequelize.query('INSERT INTO $1:name (name, surname, date, sex, driving_license, description, gr_id) VALUES\
       ($2,$3, $4,(\'{male,female}\'::sexs[])[ceil(random() *2)],cast(cast(random() as integer) as boolean),$5,$6)',
         [this.table, nameAndSurname[0], nameAndSurname[1],faker.date.past(),faker.lorem.text(), el._id]);
    }
    console.log("Data generated");
  }

  async getStudentAndGroup(sex, driving_license) {
    return await this.model.findOne({},{include: [ Group ]})
    
  }

  async getStudentByNameAndSurname(name, surname) {
    return await this.model.findOne({where: {
      name: name,
      surname: surname
      },
      raw: true}
    );
  }

  async insertStudent(studentObj) {
    /* this.model.sync({force: true}).then(() => { */
      return await this.model.create(
      {
        name: studentObj.name,
        surname: studentObj.surname,
        date: studentObj.date,
        sex: studentObj.sex,
        description: studentObj.description,
        driving_license: studentObj.driving_license,
        gr_id: studentObj.gr_id
      });
 
  }

  async updateStudentbyId(id, studentObj) {
    return await this.model.update(
      {
        name: studentObj.name,
        surname: studentObj.surname,
        date: studentObj.date,
        sex: studentObj.sex,
        description: studentObj.description,
        driving_license: studentObj.driving_license,
        gr_id: studentObj.gr_id
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

  async addGroupToInstructor(id, groupId) {
    return await this.model.update(
      {
        gr_id: groupId
      }, 
      { 
        where: {
          id: id
        }
      });
  }

  async findPhrase(phrase) {
    return (await this.sequelize.query(`SELECT name, surname, date,sex, ts_headline(description, q) 
        FROM students, phraseto_tsquery('${phrase}') q WHERE to_tsvector(description) @@ q;`))[0];
  }

  async findWords (words) {
    words = words.map(word => '!' + word).join(' & ');
    return (await this.sequelize.query(`SELECT name,surname, date,sex, ts_headline(description, q) 
        FROM students, to_tsquery('${words}') q WHERE to_tsvector(description) @@ q;`))[0];
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