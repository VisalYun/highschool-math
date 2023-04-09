const sql = require('../db');

const Lesson = function () { }

Lesson.getAllGrades = (result) => {
    let query = "SELECT * FROM lesson";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("lesson: ", res);
        result(null, res);
    });
}

Lesson.getLessonByGrade = (gradeId, result) => {
    let query = `SELECT * FROM lesson WHERE grade_id = ${gradeId}`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found lesson: ", res);
            result(null, res);
            return;
        }

        result({ type: "not_found" }, null);
    });
}

Lesson.getLessonById = (id, result) => {
    let query = `SELECT * FROM lesson WHERE lesson_id = ${id}`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found lesson: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ type: "not_found" }, null);
    });
}

module.exports = Lesson;