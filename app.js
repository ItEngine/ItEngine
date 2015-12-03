//All requires native nodejs
var path = require('path');

//All requires packages nodejs
var bodyParser = require('body-parser');
var express = require('express');
var nodemailer = require("nodemailer");

//Init server express
var app = express();

var emailItEngine = "itengine.argentina@gmail.com";
//Config smtp email
var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",
   auth: {
       user: emailItEngine,
       pass: "itengineadmin"
   }
});

//Set folder static files
app.use('/', express.static(__dirname + '/public'));
//For the verbs HTTP get params
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//Servind modules node_modules in the url scripts
app.use('/scripts', express.static(path.join(__dirname, '/node_modules')));
//Setvind module bower_components in the url scripts
app.use('/scripts_bower', express.static(path.join(__dirname, '/bower_components')));

//Route for send email
app.post('/send_email',function(req,res){
  //Email data
  var mailOptions={
    to : emailItEngine,
    subject : "Mensaje de: " + req.body.firstname + " " + req.body.lastname,
    text : req.body.message + " (Mi email es: " + req.body.email + ")"
  }

  //Sent emails
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.end("Error al enviar el email.");
    }else{
      console.log("Message sent: " + response.message);
      res.end("El email se ha enviado correctamente!");
    }
  });
});

//Listen server
app.listen(3000, function() {
  console.log('Listening port: 3000')
});
