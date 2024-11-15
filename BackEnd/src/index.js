var express = require('express');
var app = express();

app.post('/search', function(req, res){
   res.send("Hello world!");
   console.log(res);
});

app.listen(4000);