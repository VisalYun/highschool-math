const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

const lessons = [
    {
        id: 1,
        title: "មេរៀនទី១"
    },
    {
        id: 2,
        title: "មេរៀនទី២"
    },
    {
        id: 3,
        title: "មេរៀនទី៣"
    },
    {
        id: 4,
        title: "មេរៀនទី៤"
    },
];

const exercises = [
    {
        id: 1,
        lessonId: 1,
        title: "Please find X",
        expression: "https://ichef.bbci.co.uk/images/ic/448xn/p0cyrps6.png",
        answer: ""
    },
    {
        id: 2,
        lessonId: 1,
        title: "Please find X",
        expression: "https://eager2solve.com/wp-content/uploads/2021/12/algebra-math-problem-How-to-solve-the-quadratic-equation-1024x683.jpg",
        answer: ""
    },
    {
        id: 3,
        lessonId: 2,
        title: "Please find X",
        expression: "https://ichef.bbci.co.uk/images/ic/448xn/p0cyrps6.png",
        answer: ""
    },
    {
        id: 4,
        lessonId: 2,
        title: "Please find X",
        expression: "https://ichef.bbci.co.uk/images/ic/448xn/p0cyrps6.png",
        answer: ""
    },
    {
        id: 5,
        lessonId: 3,
        title: "Please find X",
        expression: "https://ichef.bbci.co.uk/images/ic/448xn/p0cyrps6.png",
        answer: ""
    },
    {
        id: 6,
        lessonId: 3,
        title: "Please find X",
        expression: "https://ichef.bbci.co.uk/images/ic/448xn/p0cyrps6.png",
        answer: ""
    }
]

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/grade/:id", (req, res) => {
    const grade = req.params.id;
    res.render("lesson_list", {grade, lessons});
});

app.get("/lesson/:id", (req, res) => {
    const lessonId = req.params.id;
    const lesson = lessons.filter(l => l.id == lessonId);
    if(lesson.length == 0){
        res.render("home");
    }

    const lessonExercises = exercises.filter(e => e.lessonId == lessonId);
    res.render("exercise_list", {lesson: lesson[0], lessonExercises})
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
    console.log("Server start successfully!");
})