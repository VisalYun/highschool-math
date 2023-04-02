const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/grade/:id", (req, res) => {
    const grade = req.params.id
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
    ]
    res.render("lesson_list", {grade, lessons});
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
    console.log("Server start successfully!");
})