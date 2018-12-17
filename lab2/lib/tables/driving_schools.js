
class DrivingSchools {

  constructor(model) {
    this.model = model; 
  }

  async getAllDrivingSchools() {
    return await this.model.findAll({raw: true});
  };

  async getDrivingSchoolById(id) {
    return await this.model.findOne({where: {id:id}, raw: true});
  }

  generateData(){
    return db.query('INSERT INTO $1:name (groups_count, name) SELECT i, md5(random()::text)\
     FROM generate_series(1, 100) AS i;', [this.table]);
  }

  async getDrivingSchoolByName(schoolName) {
    return await this.model.findOne({name: schoolName});
  }

  async insertDrivingSchool(schoolName,groups_count) {
    return await this.model.create({name: schoolName, groups_count: groups_count});
  }

  async updateDrivingSchoolbyName(schoolName, newSchoolname, groups_count) {
    return await this.model.update({name: newSchoolname}, 
      { 
        where: {
          name: schoolName,
          groups_count: groups_count
        }
      });
  }

  async updateDrivingSchoolbyId(id, newSchoolname, groups_count) {
    return await this.model.update({name: newSchoolname, groups_count: groups_count}, 
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
}

module.exports = DrivingSchools;
