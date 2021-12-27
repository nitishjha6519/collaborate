const express=require("express");
const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/collabShipDB");
const collabShipSchema= new mongoose.Schema({
	projectName: String,
	type: String,
	date: Date

});
const boxes=mongoose.model("boxes",collabShipSchema );   //collections called nameEmail

// const item1=new boxes ({
// 	projectName: "Apple",
// 	type: "Backend",
// 	date: "2021-12-27",
// });
// item1.save();


 boxes.find(function(err,docs){
if(err){
	console.log(err);
}
else{

	// console.log(docs);
	docs.forEach(function(doc){
		console.log(doc.projectName);


	});
}
});



const app=express();
app.set('view engine', 'ejs');
app.use(express.static("Public"));

app.get("/", function(req,res){
res.render("index");
});




app.listen(3000, function(){
    console.log("server is running at port 3000");
});

