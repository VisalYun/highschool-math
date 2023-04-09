const sql = require('../db');

const Grade = function () { }

Grade.getAllGrades = (result) => {
    let query = "SELECT * FROM grade";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("grade: ", res);
        result(null, res);
    });
}

Grade.getGradeById = (id, result) => {
    let query = `SELECT * FROM grade WHERE grade_id = ${id}`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found grade: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ type: "not_found" }, null);
    });
}

module.exports = Grade;