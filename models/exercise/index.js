const sql = require('../db');

const Exercise = function () { }

Exercise.getExerciseByLesson = (lessonId, result) => {
    let query = `SELECT * FROM exercise WHERE lesson_id = ${lessonId}`;

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

module.exports = Exercise;