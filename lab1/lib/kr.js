let Connect = require('./connect');
let connect = new Connect('postgres', 5555, 'driving_school', 'public');
let db = connect.getDatabase();

//Максимальна оцінка з математики
function getMaxMathMark() {
	return db.query(`SELECT s_name FROM journal j 
    JOIN student s ON j.s_id = s.s_id
    JOIN (select * from subject where sub_name='math') sub ON j.sub_id = sub.sub_id
    WHERE mark=5`);
};

//Предмети без незадовільних оцінок
function getSubjects() {
	return db.query(`SELECT sub.sub_name FROM subject AS sub
    WHERE (SELECT min(j.mark) FROM journal j 
    WHERE j.sub_id = sub.sub_id
    GROUP BY j.sub_id) > 2`);
};

//Середній бал оцінок кожного учня серед тих хто не отримав відміних оцінок
function getAverageMark() {
	return db.query(`SELECT AVG(mark), s_name
    FROM student as s
    INNER JOIN journal AS j ON s.s_id = j.s_id
    WHERE mark<5
    GROUP BY s_name`);
};

//Список боржників
function getDebtors() {
	return db.query(`SELECT s_name FROM record_card rc
    JOIN student s ON rc.s_id = s.s_id
    where return_date>limit_date
    and limit_date < current_date
    GROUP BY s_name`);
};

//Список книжок на руках
function getBooks() {
	return db.query(`SELECT b_name FROM record_card rc
    JOIN books b ON rc.b_id = b.b_id
    WHERE return_date IS NULL
    GROUP BY b_name`);
};

//Автори чиї книжки взяв кожен читач
function getAuthors() {
	return db.query(`WITH book_reader_pair as (
        SELECT s_id, b_id
        FROM record_card 
        GROUP BY s_id, b_id
    ),
    book_reader_count as (
        SELECT b_id, count(b_id) count
        FROM book_reader_pair
        GROUP BY b_id
    ),
    popular_books as (
        SELECT b_id 
        FROM book_reader_count
        WHERE count = (SELECT count(s_id) FROM student)
    )

    SELECT a.surname, a.name
    FROM books b
    INNER JOIN popular_books pb
    ON pb.b_id = b.b_id
    INNER JOIN author a
    ON a.a_id = b.a_id
    GROUP BY a.a_id`);
};


async function print(){
    let data = await getMaxMathMark()
    console.log('------------------------------')
    console.log('Максимальна оцінка з математики')
    console.log(data)
    
    data = await getSubjects()
    
    console.log('------------------------------')
    console.log('Предмети без незадовільних оцінок')
    console.log(data)
    
    
    data = await getAverageMark()
    console.log('------------------------------')
    console.log('Середній бал оцінок кожного учня серед тих хто не отримав відміних оцінок')
    console.log(data)
    
    
    data = await getDebtors()
    console.log('------------------------------')
    console.log('Список боржників')
    console.log(data)
    
    
    data = await getBooks()
    console.log('------------------------------')
    console.log('Список книжок на руках')
    console.log(data)
    
    
    data = await getAuthors()
    console.log('------------------------------')
    console.log('Автори чиї книжки взяв кожен читач')
    console.log(data)
}

print().then(() => {})


