var path = require('path');
var fs = require('fs')
var express = require('express');
var exphbs = require('express-handlebars')
var ece = require('./ece361.json');
var math = require('./math.json')
var c = require('./c.json')
const { ppid } = require('process');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json())

app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.get('/', function (req, res, next) {
    res.status(200).render('index')
})

app.get('/ece361', function (req, res, next){
    res.status(200).render('classes', {ece, useEce: true})
    
})

app.post('/ece361', function (req, res, next){
  let data = fs.readFileSync('ece361.json')
  let json = JSON.parse(data)
  
  let newData = {Text: req.body.Text}
  json.push(newData)
  fs.writeFileSync('ece361.json', JSON.stringify(json, null, 2))
  res.status(200).json(json)

})

app.get('/math', function (req, res, next){
    res.status(200).render('classes', {math, useMath: true})
})

app.post('/math', function (req, res, next){
  let data = fs.readFileSync('math.json')
  let json = JSON.parse(data)
  
  let newData = {Text: req.body.Text}
  json.push(newData)
  fs.writeFileSync('math.json', JSON.stringify(json, null, 2))
  res.status(200).json(json)
})

app.get('/c', function (req, res, next){
  res.status(200).render('classes', {c, useC: true})
})

app.post('/c', function (req, res, next){
  let data = fs.readFileSync('c.json')
  let json = JSON.parse(data)
  
  let newData = {Text: req.body.Text}
  json.push(newData)
  fs.writeFileSync('c.json', JSON.stringify(json, null, 2))
  res.status(200).json(json)
})

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});