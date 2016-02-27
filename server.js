var express = require('express');
var app = express();


var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']); 
var bodyParser = require('body-parser'); 
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); 

 app.get('/contact_list_app', function (req, res) {
   console.log("i received a get req");
   db.contactlist.find(function (err, docs) {
	console.log(docs);
	res.json(docs); 
});
   
	
 });
 app.post('/contact_list_app', function (req, res){
 	console.log(req.body);
 	db.contactlist.insert(req.body,function(err,doc){
 		res.json(doc);
 	});
 });
 app.delete('/contact_list_app/:id', function (req, res){
 	var id=req.params.id;
 	console.log(id);
 	db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,doc){
 	res.json(doc);
 });


 });
 app.get('/contact_list_app/:id', function (req, res){
 	var id=req.params.id;
 	console.log(id);
 	db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
 		res.json(doc);
 	});

 });

app.put('/contact_list_app/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});