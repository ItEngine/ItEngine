'use strict'

const nodemailer = require("nodemailer");

// Rutas de la aplicación
module.exports = function(app){

  const emailItEngine = "itengine.argentina@gmail.com";
  //Config smtp email
  let smtpTransport = nodemailer.createTransport("SMTP",{
     service: "Gmail",
     auth: {
         user: emailItEngine,
         pass: "itengineadmin"
     }
  });

  //Route for send email
  app.post('/send_email',function(req,res){
    //Email data
    let mailOptions={
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
        res.end("¡El email se ha enviado correctamente!");
      }
    });
  });

}
