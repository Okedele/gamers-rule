let express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  config = require('./config/DB'),
  http = require('http');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static(__dirname+"/app"));
let port = process.env.PORT || 4140;
// Database
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(config.DB,{ useNewUrlParser: true}).then(
  () => {console.log("Database connection successful")},
  err => {console.log("can not connect to database")}
);

let usercontroller = require("./Controllers/user.controller");

//server magic
app.get('/',function(req,res){
    res.sendFile("/login2.html",{root : __dirname+"/app"});
})
app.use('/user',usercontroller);

http.createServer(app).listen(port);
console.log("server listening on port "+port);
