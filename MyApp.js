require("dotenv").config();
let express = require('express');
let borderParser = require("body-parser");
let app = express();

app.use(borderParser.urlencoded({extended: false}));

app.use((req, res, next) => {
const string = req.method + " " + req.path + " - " + req.ip;
console.log(string);
next(); 
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", function(req, res){
    if (process.env.MESSAGE_STYLE =="uppercase"){
        res.json({"message": "HELLO JSON"});
    } else {
        res.json({"message": "Hello json"});
    };
    
});

app.get("/now", function(req, res, next){
    req.time = new Date().toString();
    next();
}, function(req, res){
    res.json({"time": req.time});
});

app.get("/:word/echo", function(req, res){
    const { word } = req.params;
    res.json({echo: word});
    
});

app.get("/name", function(req, res){
    var firstname = req.query.first;
    var lastname = req.query.last;
    res.json({name: `${firstname} ${lastname}`});
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/views/index.html");
});

app.post("/name", function(req, res){
    var first = req.body.first;
    var last = req.body.last;
    var email = req.body.email;
    var address = req.body.address;
    var state = req.body.state;
    var gender = req.body.gender;
    var maritalStatus = req.body.maritalStatus;
    var web = req.body.web;
    res.json({name: {
        "First Name": first,
        "Last Name": last,
        "Email": email,
        "Address": address,
        "State": state,
        "Gender": gender,
        "Marital Status": maritalStatus,
        "Website Skiils": web
    }});

})

























const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Server is running at port 3000");
});
