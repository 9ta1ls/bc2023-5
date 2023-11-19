const express = require("express");
const PORT = 8000;
const app = express();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const upload = multer();

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

app.get("/UploadForm.html", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "UploadForm.html"));
});

app.get("/notes", (req,res)=>{
    res.sendFile(path.join(__dirname,"notes.json"));
});




app.listen(PORT,()=>{
    console.log(`Сервер запущено на порті ${PORT}`); 
})