const express = require("express");
const PORT = 8000;
const app = express();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const upload = multer();

app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(upload.any());
app.use(express.text());

app.get("/UploadForm.html", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "UploadForm.html"));
});

app.get("/notes", (req, res) => {
  if (!fs.existsSync("notes.json")){
      fs.writeFileSync("notes.json", "[]");
  }
  res.sendFile("notes.json", {root: __dirname});
})

app.get("/notes/:noteTitle", (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "notes.json")));
  const noteTitle = req.params.noteTitle;
  const foundNote = notes.find((obj) => obj.title === noteTitle);
  if (!foundNote){
    res.sendStatus(404);
  }
  res.send(foundNote.note);
});

app.post("/upload", (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "notes.json")));
  const noteTitle = req.body.note_name;
  const foundNote = notes.find((obj) => obj.title === noteTitle);
  if(foundNote){
    res.sendStatus(400);
  }
  const Note = req.body.note;
  const newNote = {"title": noteTitle, "note": Note};
  notes.push(newNote);
  dataToWrite = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataToWrite);
  res.sendStatus(201);
});

app.put("/notes/:noteTitle", (req, res)=>{
  let notes = JSON.parse(fs.readFileSync(path.join(__dirname, "notes.json")));
  const noteTitle = req.params.noteTitle;
  const foundNote = notes.find((obj) => obj.title === noteTitle);
  if (!foundNote){
    res.sendStatus(404);
  }
  const newNote = req.body;
  foundNote.note = newNote;
  dataToWrite = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataToWrite);
  console.log(notes);
  res.sendStatus(200);
});

app.delete("/notes/:noteTitle", (req, res)=>{
  let notes = JSON.parse(fs.readFileSync(path.join(__dirname, "notes.json")));
  const noteTitle = req.params.noteTitle;
  const foundIndexNote = notes.findIndex((obj) => obj.title === noteTitle);
  console.log(foundIndexNote);
  if (foundIndexNote === -1){
    res.sendStatus(404);
  }
  notes.splice(foundIndexNote, 1);
  const dataToWrite = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataToWrite);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
