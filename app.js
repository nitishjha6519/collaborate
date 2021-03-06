const express=require("express");
const mongoose=require("mongoose");
const bodyParser= require("body-parser");

mongoose.connect("mongodb://localhost:27017/collabShipDB");


const collabShipSchema= new mongoose.Schema({
	projectName: String,
	type: String,
	date: Date

});


const signupsSchema= new mongoose.Schema({
	name: String,
	gitProfile: String

});

const boxes=mongoose.model("boxes",collabShipSchema );   //collections called nameEmail
var arr=[];


const signups=mongoose.model("signups",signupsSchema );   //collections called nameEmail
var signupsArr=[];



boxes.find(function(err,docs){ 
	if(err){
		console.log(err);
	} else{ 
		docs.forEach(function(doc){
			arr.push(doc.projectName) ;
		}); 
	} 
	console.log(arr);
// console.log(docs);
});



const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("Public"));

app.get("/", function(req,res){
	res.render("index" , {arr: arr});
});

app.get("/apply", function(req,res){
	res.sendFile(__dirname + "/Apply.html");
});

app.post("/apply", function(req,res){
	var userName= req.body.name;


	const user= new signups({
		name: req.body.name,
		gitProfile: req.body.gitProfile,
	});
	user.save(function(err){
		if(err){
			console.log(err);
		}
		else{
			
          res.render("welcome");
          

			
			
		}
	});
	

});





app.listen(3000, function(){
	console.log("server is running at port 3000");
});

