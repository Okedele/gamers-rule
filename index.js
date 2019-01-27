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
    res.sendFile("/index.html",{root : __dirname+"/app"});
})
app.get('/created',function(req,res){
  let data = [
    {name:"garaga",date:"1/1/12",players:3},
    {name:"meetings_of_gods",date:"1/12/12",players:4},
    {name:"DnD_Raw",date:"1/8/14",players:5},
    {name:"garAgA",date:"1/9/15",players:6}
]
  res.send(data)
})
app.get('/joined',function(req,res){
  let data =[
    {name:"REgaraga",date:"1/10/12",playing:false},
    {name:"class_19_fantasy",date:"1/5/13",playing:false},
    {name:"hour_of_recon",date:"1/3/15",playing:false},
    {name:"LArange",date:"1/5/18",playing:true}
  ]
  res.send(data)
})
app.use('/user',usercontroller);

http.createServer(app).listen(port);
console.log("server listening on port "+port);
