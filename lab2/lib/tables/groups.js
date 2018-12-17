

class Groups {

  constructor(model) {
    this.model = model;
  }

  async getAllGroups() {
    return await this.model.findAll({raw: true});
  };

  async generateData(instructorsTable){
    let instructors = await this.sequelize.query('SELECT $1:name FROM $2:name', ['*', instructorsTable]);
      for(let el of instructors){
        await this.sequelize.query('INSERT INTO $1:name (name, max_count, ins_id) VALUES (md5(random()::text), random()::int,$2)', [this.table,el._id]);
      }
    console.log("Data generated");
  }

  async getGroupById(id) {
    return await this.model.findOne({where: {id:id}, raw: true});
  }

  async getGroupByName(name) {
    return await this.model.findOne({where: {name:name}, raw: true});
  }

  async insertGroup(groupObj) {
    return await this.model.create({
       name: groupObj.name,
       max_count: groupObj.max_count,
       ins_id: groupObj.ins_id
    });
    
  }

  async updateGroupbyId(id, groupObj) {
    return await this.model.update(
      {
        name: groupObj.name,
        max_count: groupObj.max_count,
        ins_id: groupObj.ins_id
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

  async deleteByName(name) {
    return await this.model.destroy({
      where: {
        name: name
      }
    });
  }

  async addInstructorToGroup(id, instructorId) {
    return await this.model.update(
      {
        ins_id: instructorId
      }, 
      { 
        where: {
          id: id
        }
      });
  }

  
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

