let Connect = require('../connect');
let connect = new Connect('postgres', 5555, 'driving_school', 'driving_school');
let db = connect.getDatabase();

// db.query('SELECT * FROM instructors WHERE name LIKE \'3\'')
// .then((data) => console.log(data))


// db.query('SELECT * FROM instructors,students WHERE instructors.name in (\'3\', \'Bddssd\') AND students.name in (\'3\', \'Bddssd\') AND students.sex=true')
// .then(data => console.log(data))

// db.query(`
// CREATE TYPE sexs AS ENUM ('male', 'female');
// CREATE TABLE driving_school.instructors
// (
//     _id serial NOT NULL,
//     name character varying(255) NOT NULL,
//     surname character varying(255) NOT NULL,
//     year integer NOT NULL,
//     sex sexs NOT NULL,
//     drs_id integer NOT NULL REFERENCES driving_schools (_id),
//     PRIMARY KEY (_id)
// )
// WITH (
//     OIDS = FALSE
// );

// ALTER TABLE driving_school.instructors
//     OWNER to postgres;`)
//     .then((data) => console.log(data));

// db.query(`
// CREATE TABLE driving_school.groups
// (
//     _id serial NOT NULL,
//     name character varying(255) NOT NULL,
//     max_count integer NOT NULL,
//     ins_id integer NOT NULL REFERENCES instructors (_id),
//     PRIMARY KEY (_id)
// )
// WITH (
//     OIDS = FALSE
// );

// ALTER TABLE driving_school.groups
//     OWNER to postgres;`)
//    .then((data) => console.log(data));

//CREATE TYPE sexs AS ENUM ('men', 'woman');
db.query(`
CREATE TABLE driving_school.students
(
    _id serial NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    date date NOT NULL,
    sex sexs NOT NULL,
    description text NOT NULL, 
    driving_license boolean NOT NULL,
    gr_id integer NOT NULL REFERENCES groups (_id),
    PRIMARY KEY (_id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE driving_school.students
     OWNER to postgres;`)
    .then((data) => console.log(data));



// db.query('SELECT * FROM instructors to_tsquery($1) AS q WHERE make_tsvector(name) @@ q;', '3')
// .then(data => console.log(data))




// db.query('SELECT s._id, s.name, s.date, g.name, g.max_count FROM students s JOIN groups g ON s.gr_id=g._id AND s.sex=\'male\' AND s.driving_license=true')
// .then(data => console.log(data))
