const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

const Grade = require("./models/grade");
const Lesson = require("./models/lesson");
const Exercise = require("./models/exercise");

app.get("/", (req, res) => {
    Grade.getAllGrades((err, data) => {
        if(err){
            res.render("error");
        }
        else {
            const gradeList = data;
            res.render("home", {gradeList});
        }
    })
});

app.get("/grade/:id", (req, res) => {
    const grade = req.params.id;
    Grade.getGradeById(grade, (err, gradeData) => {
        if(err){
            if(err.type === "not_found"){
                res.redirect("/")
            }
            else {
                res.render("error");
            }
        }
        else {
            Lesson.getLessonByGrade(grade, (err, lessonsData) => {
                if(err){
                    if(err.type === "not_found"){
                        res.render("lesson_list", {grade: gradeData, lessons: []});
                    }
                    else {
                        res.render("error");
                    }
                }
                else {
                    res.render("lesson_list", {grade: gradeData, lessons: lessonsData});
                }
            });
        }
    });
});

app.get("/lesson/:id", (req, res) => {
    const lessonId = req.params.id;
    Lesson.getLessonById(lessonId, (err, lessonData) => {
        if(err){
            if(err.type = "not_found"){
                res.redirect("/")
            }
            else {
                res.render("error");
            }
        }
        else {
            Exercise.getExerciseByLesson(lessonId, (err, exercisesData) => {
                if(err){
                    if(err.type = "not_found"){
                        res.render("exercise_list", {lesson: lessonData, lessonExercises: []})
                    }
                    else {
                        res.render("error");
                    }
                }
                else {
                    res.render("exercise_list", {lesson: lessonData, lessonExercises: exercisesData});
                }
            })
        }
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
    console.log("Server start successfully!");
})