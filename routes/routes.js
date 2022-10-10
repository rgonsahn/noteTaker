const fs= require('fs');
const path= require('path');

module.exports= app =>{
    fs.readFile("db/db.json","utf-8",(err,data)=>{
        if (err) throw err;
        var myNotes= json.parse(data);
    })
}