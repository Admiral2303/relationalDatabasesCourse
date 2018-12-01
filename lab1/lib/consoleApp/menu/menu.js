var readlineSync = require('readline-sync');
const readline = require('readline');
let Drschools = require('../../tables/driving_schools');
let Instructors = require('../../tables/instructors');
let Groups = require('../../tables/groups');
let Students = require('../../tables/students');

let groups = new Groups();
let instructors = new Instructors();
let driving_schools = new Drschools();
let students = new Students();


class Menu {
  constructor(config){
    this.config = config;
  }

  mainMenu(){
    for(let key of Object.keys(this.config.mainMenu)){
      console.log(this.config.mainMenu[key]);
    }
    let number = this.chooseNumber();
   return number;
  }

  drivingSchoolMenu(){
    for(let key of Object.keys(this.config.drivingSchoolsOptions)){
      console.log(this.config.drivingSchoolsOptions[key][0]);
    }
    let number = this.chooseNumber();
    return number;
  }

  instructorsMenu(){
    for(let key of Object.keys(this.config.instructorsOptions)){
      console.log(this.config.instructorsOptions[key][0]);
    }
    let number = this.chooseNumber();
    return number;
  }

  groupsMenu(){
    for(let key of Object.keys(this.config.groupsOptions)){
      console.log(this.config.groupsOptions[key][0]);
    }
    let number = this.chooseNumber();
    return number;
  }

  studentsMenu(){
    for(let key of Object.keys(this.config.studentsOptions)){
      console.log(this.config.studentsOptions[key][0]);
    }
    let number = this.chooseNumber();
    return number;
  }

  async printDrivingSchoolQuery(number){
    try{
    switch(number) {
        case 1:
          console.log(await driving_schools.getAllDrivingSchools())
          break;
        case 2:
          let id = this.chooseNumber('Choose the number: ');
          console.log(await driving_schools.getDrivingSchoolById(id))
          break;
        case 3: 
          let str = this.enterString();
          console.log(await driving_schools.getDrivingSchoolByName(str))
          break;
        case 4:
          let updateId = this.chooseNumber('Enter id: ');
          let newSchoolname = this.enterString('Enter school name: ');
          let groups_count = this.chooseNumber('Enter groups_count: ');
          await driving_schools.updateDrivingSchoolbyId(updateId, newSchoolname, groups_count);
          console.log(await driving_schools.getDrivingSchoolById(updateId));
          break;
        case 5: 
          let deleteId = this.chooseNumber('Enter id: ');
          await driving_schools.deleteById(deleteId);
          break;
        case 6:
          let insName = this.enterString('Enter school name: ');
          let insCount = this.chooseNumber('Enter groups_count: ');
          await driving_schools.insertDrivingSchool(insName, insCount);
          break;
        default: 
          console.log("+++");
          break;
      }
    } catch(err) {
      console.log(err);
    }
  }


  async instuctorsQueryMenu(number){
    try{
      switch(number) {
          case 1:
            console.log(await instructors.getAllInstructors())
            break;
          case 2:
            let id = this.chooseNumber('Choose the number: ');
            console.log(await instructors.getInstructorById(id))
            break;
          case 3: 
            let name = this.enterString('Name: ');
            surname = this.enterString('Surname: ');
            console.log(await instructors.getInstructorsByNameAndSurname(name,surname))
            break;
          case 4:
            let instrucorObject = {};
            let updateId = this.chooseNumber('Enter id: ');
            instrucorObject.name = this.enterString('Enter instructor name: ');
            instrucorObject.surname = this.enterString('Enter instructor surname: ');
            instrucorObject.date = new Date();
            instrucorObject.sex = this.enterString('Enter instructor sex: ');
            instrucorObject.drs_id = this.chooseNumber('Enter driving school id: ');
            await instructors.updateInstructorbyId(updateId, instrucorObject);
            console.log(await instructors.getInstructorById(updateId));
            break;
          case 5: 
            let deleteId = this.chooseNumber('Enter id: ');
            await instructors.deleteById(deleteId);
            break;
          case 6: 
            let insObject = {};
            insObject.name = this.enterString('Enter instructor name: ');
            insObject.surname = this.enterString('Enter instructor surname: ');
            insObject.date = new Date();
            insObject.sex = this.enterString('Enter instructor sex: ');
            insObject.drs_id = this.chooseNumber('Enter driving school id: ');
            await instructors.insertInstructor(insObject);
            break;
          default: 
            console.log("+++");
            break;
        }
      } catch(err) {
        console.log(err);
      }
  }

  async groupsQuery(number){
    try{
      switch(number) {
        case 1:
          console.log(await groups.getAllGroups())
          break;
        case 2:
          let id = this.chooseNumber('Choose the number: ');
          console.log(await groups.getGroupById(id))
          break;
        case 3:
          let groupObj = {};
          let updateId = this.chooseNumber('Enter id: ');
          groupObj.name = this.enterString('Enter group name: ');
          groupObj.max_count = this.chooseNumber('Enter max students count: ');
          await groups.updateGroupbyId(updateId, groupObj);
          console.log(await groups.getGroupById(updateId));
          break;
        case 4: 
          let deleteId = this.chooseNumber('Enter id: ');
          await groups.deleteById(deleteId);
          break;
        case 5: 
          let insObj = {};
          insObj.name = this.enterString('Enter group name: ');
          insObj.max_count = this.chooseNumber('Enter max students count: ');
          insObj.ins_id = this.chooseNumber('Enter instructor id: ');
          await groups.insertGroup(insObj);
          break;
        default: 
          console.log("+++");
          break;
      }
    } catch(err){
      console.log(err);
    }
  }

  async studentsQueryMenu(number){
    try{
      switch(number) {
        case 1:
          console.log(await students.getAllStudents())
          break;
        case 2:
          let id = this.chooseNumber('Choose the number: ');
          console.log(await students.getStudentById(id))
          break;
        case 3:
          let studentObject = {};
          let updateId = this.chooseNumber('Enter id: ');
          studentObject.name = this.enterString('Enter student name: ');
          studentObject.surname = this.enterString('Enter student surname: ');
          studentObject.date = new Date();
          studentObject.sex = this.enterString('Enter student sex: ');
          studentObject.description = this.enterString('Enter student description: ');
          await students.updateStudentbyId(updateId, studentObject);
          console.log(await students.getStudentById(updateId));
          break;
        case 4: 
          let deleteId = this.chooseNumber('Enter id: ');
          await students.deleteById(deleteId);
          break;
        case 5:
          let studentInsetObject = {};
          studentInsetObject.name = this.enterString('Enter student name: ');
          studentInsetObject.surname = this.enterString('Enter student surname: ');
          studentInsetObject.date = new Date();
          studentInsetObject.sex = this.enterString('Enter student sex: ');
          studentInsetObject.description = this.enterString('Enter student description: ');
          studentInsetObject.driving_license = this.enterString('Enter student driving_license: ') === 'true';
          studentInsetObject.gr_id = this.chooseNumber('Enter group id: ');
          await students.insertStudent(studentInsetObject);
          break;
        case 6: 
          let sex = this.enterString('Enter student sex: ');
          let driving_license = this.enterString('Enter student driving_license: ') === 'true';
          console.log(await students.getStudentAndGroup(sex, driving_license));
          break;
        case 7: 
          let phrase = this.enterString('Enter string: ');
          console.log(await students.findPhrase(phrase));
          break;
        case 8: 
          let words = this.enterString('Enter words: ').split(' ');
          console.log(await students.findWords(words));
          break;
        default: 
          console.log("+++");
          break;
      }
    } catch(err){
      console.log(err);
    }
  }

  chooseNumber(query){
    let number;
    while(isNaN(number)){
      number = readlineSync.question(query);
    }
    return parseInt(number); 
  }

  enterString(query){
    let str;
    str = readlineSync.question(query);
    return str; 
  }

  async generateData(){
    // await driving_schools.generateData();
    // await instructors.generateData('driving_schools');
    // await groups.generateData('instructors');
    await students.generateData('groups');
  }

  consoleClear(){
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
  }
}


module.exports = Menu;