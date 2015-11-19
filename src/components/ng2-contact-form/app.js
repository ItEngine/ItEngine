(function(){
  //Get path template
  var script = document.querySelector("script[src$='ng2-contact-form/app.js']").getAttribute("src");
  var pathTemplate = script.substring(0, script.lastIndexOf('/') + 1);

  //Componen contact-form
  var title;
  var AppComponentContactForm = ng
    .Component({
      selector: 'contact-form',
      properties: {'title':'title'},
      templateUrl: pathTemplate + 'template/contact-form.html'
    })
    .Class({
      constructor: function(){
        this.title = "Contáctenos";
        this.legend = "Si quiere contactarse con nosotros, complete el siguiente formulario y a la brevedad estaremos respondiendo el mensaje.";
        this.first_name = "Nombre";
        this.last_name = "Apellido";
        this.email = "Correo electrónico";
        this.message = "Mensaje";
        this.send = "Enviar";
      }
    });

  //Init component
  document.addEventListener('DOMContentLoaded', function(){
    ng.bootstrap(AppComponentContactForm);
  });

})();
