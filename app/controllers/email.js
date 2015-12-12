'use strict'

//All requires native nodejs
const path = require('path');

//My instance of app.js (this found because previosly export)
const app = require(path.join(process.cwd(), 'app'));

const nodemailer = require("nodemailer");

// Controller email

module.exports = {

  //This method send email
  indexFormContact: function(req, res) {
    const emailItEngine = app.get('settings').contact.email;
    //Config smtp email
    let smtpTransport = nodemailer.createTransport("SMTP",{
       service: app.get('settings').contact.service,
       auth: {
           user: emailItEngine,
           pass: app.get('settings').contact.password
       }
    });

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
        return res.end("Error al enviar el email.");
      }else{
        console.log("Message sent: " + response.message);
        return res.end("¡El email se ha enviado correctamente!");
      }
    });
  }

}
