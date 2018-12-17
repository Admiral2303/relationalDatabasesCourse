var Sequelize = require('sequelize');
let DrSchoolModel = require('./models/driving_school');
let GroupModel = require('./models/group');
let InstructorModel = require('./models/instuctors');
let StudentModel = require('./models/student');


const sequelize = new Sequelize('postgres', 'postgres', '', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5555,
  database: 'postgres',
  protocol: null,
  logging: false,
  define: {
    schema: 'driving_school',
    timestamps: false,
    underscored: true
  },
  // sync: { force: true },
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  }
});

let drivingSchoolModel = sequelize.import('./models/driving_school');
let groupsModel = sequelize.import('./models/group');
let instructorModel = sequelize.import('./models/instuctors');
let studentModel = new StudentModel(sequelize, Sequelize,groupsModel);
// sequelize.sync({ force: true });

studentModel.associate();
// studentModel.down().then(() => {});
studentModel.up().then(() => {});


module.exports = {
  drivingSchoolModel,
  groupsModel,
  instructorModel,
  studentModel,
  sequelize
}


