const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();
const port=3000;
const listItems = [];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  const day = date.getDate();

  res.render("list", {
    listTitle: day,
    listItems : listItems
  });
});
app.get("/work",function(req,res){
    res.render("list",{
        listTitle: "Work List",
        workItems : workItems
    });
});
app.post("/", function(req, res){

    if(req.body.listSubmit === "Work"){
        workItems.push(req.body.newTodo);
        res.redirect("/work");
      }else{
        listItems.push(req.body.newTodo);
        res.redirect("/");
      }
  });

app.listen(port,function(){
    console.log(`Server runing on port ${port}`);
});