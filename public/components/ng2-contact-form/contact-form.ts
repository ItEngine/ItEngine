import {bootstrap, Component, ElementRef, View} from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, NgIf} from "angular2/angular2";
import {Validators} from 'angular2/angular2';

@Component({
  selector: 'contact-form',
  properties: [
    'title',
    'firstname',
    'lastname',
    'email',
    'message',
    'send',
    'url',
    'method'
  ]
})
@View({
  directives: [FORM_DIRECTIVES, NgIf],
  templateUrl: "components/ng2-contact-form/template/contact-form.html"
})
class ComponentContactForm {
  private title:string;
  private firstname:string;
  private lastname:string;
  private email:string;
  private message:string;
  private send:string;
  private url:string;
  private method:string;
  private myForm: ControlGroup;

  constructor(private element:ElementRef, fb: FormBuilder) {
    this.myForm = fb.group({
      "firstname":  ["", Validators.required],
      "lastname":  ["", Validators.required],
      "email":  ["", Validators.required],
      "message":  ["", Validators.required],
    });

    //Get value properties
    this.title = this.element.nativeElement.title;
    this.firstname = this.element.nativeElement.getAttribute("firstname");
    this.lastname = this.element.nativeElement.getAttribute("lastname");
    this.email = this.element.nativeElement.getAttribute("email");
    this.send = this.element.nativeElement.getAttribute("send");
    this.message = this.element.nativeElement.getAttribute("message");
    this.url = this.element.nativeElement.getAttribute("url");
    this.method = this.element.nativeElement.getAttribute("method");

    //Check properties
    this.title = typeof this.title !== 'undefined' ? this.title : "Title";
    this.firstname = typeof this.firstname !== 'undefined' ? this.firstname : "First Name";
    this.lastname = typeof this.lastname !== 'undefined' ? this.lastname : "Last Name";
    this.email = typeof this.email !== 'undefined' ? this.email : "Email";
    this.send = typeof this.send !== 'undefined' ? this.send : "Send";
    this.message = typeof this.message !== 'undefined' ? this.message : "Message";
    this.url = typeof this.url !== 'undefined' ? this.url : "/send/";
    this.method = typeof this.method !== 'undefined' ? this.method : "POST";
  }

  //This method valid data form and send email
  send_email(event, form){
    event.preventDefault();
    var valid = true;

    //Valid items form
    for(var item in form){
      if(form[item] == null || form[item] == ""){
        valid = false;
      }
    }

    //Chequed if the form is valid
    if(valid){
      //Parameters
      var creds = "firstname=" + form['firstname'] + "&lastname=" + form['lastname'];
      creds = creds + "&message=" + form['message'] + "&email=" + form['email'];

      //Result to send email
      var result = <HTMLScriptElement>document.querySelector("#result");
      var result_card = <HTMLScriptElement>document.querySelector("#result_card");
      var progress = <HTMLScriptElement>document.querySelector(".tiny-contact-progress");
      //Hide elements
      result_card.style.display = "none";
      //Show progress
      progress.removeAttribute("style");

      //For hide element progress
      var att = document.createAttribute("class");
      att.value = "hide-element"

      //Send email
      fetch(this.url, {
        method: 'POST',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: creds
      })
      .then(function (data) {
        var res = data.text();
        res.then(function (message) {
          result.innerHTML = message;
          //Show card message and hide progress
          result_card.style.display = "block";
          progress.setAttributeNode(att);
        });
      })
      .catch(function (error) {
        result.innerHTML = "Error al procesar el formulario";
        //Show card message and hide progress
        result_card.style.display = "block";
        progress.setAttributeNode(att);
      });
    }else{
      result.innerHTML = "Formulario invalido";
      //Show card message and hide progress
      result_card.style.display = "block";
      progress.setAttributeNode(att);
    }
  }

}

//Load component
bootstrap(ComponentContactForm);
