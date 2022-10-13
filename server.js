const express = require("express");
const fs = require("fs");
const app = express();
const port = 3001;
const path = require("path")
const util = require("util")
const writeFile= util.promisify(fs.writeFile)
const readFile= util.promisify(fs.readFile)
function getNotes(){
    return readFile("db/db.json","utf-8").then(rawNotes =>{
        return JSON.parse(rawNotes)
    })
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})
app.get("/api/notes",(req,res)=> {
getNotes().then(notes => res.json(notes))
})
app.post("/api/notes",(req,res)=>{
    getNotes().then(oldNotes =>{
        var updatedNotes=[...oldNotes,{
            title: req.body.title,
            text: req.body.text,
            id: "1234"
        }]
       writeFile("db/db.json",JSON.stringify(updatedNotes))
    }).then(()=>res.json({
        msg:"ok"
    }))
})
app.listen(port, () => console.log("listening on:" + port))
