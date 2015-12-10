import {bootstrap, Component, ElementRef, View} from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, AbstractControl, ControlGroup, NgIf} from "angular2/angular2";
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
  private titleAttr:string;
  private firstnameAttr:string;
  private lastnameAttr:string;
  private emailAttr:string;
  private messageAttr:string;
  private sendAttr:string;
  private urlAttr:string;
  private methodAttr:string;
  private myForm: ControlGroup;
  firstname: AbstractControl;
  lastname: AbstractControl;
  email: AbstractControl;
  message: AbstractControl;

  constructor(private element:ElementRef, fb: FormBuilder) {
    //For validate form
    this.myForm = fb.group({
      "firstname":  ["", Validators.required],
      "lastname":  ["", Validators.required],
      "email":  ["", Validators.required],
      "message":  ["", Validators.required],
    });

    //Control validation
    this.firstname = this.myForm.controls['firstname'];
    this.lastname = this.myForm.controls['lastname'];
    this.email = this.myForm.controls['email'];
    this.message = this.myForm.controls['message'];

    //Get value properties
    this.titleAttr = this.element.nativeElement.title;
    this.firstnameAttr = this.element.nativeElement.getAttribute("firstname");
    this.lastnameAttr = this.element.nativeElement.getAttribute("lastname");
    this.emailAttr = this.element.nativeElement.getAttribute("email");
    this.sendAttr = this.element.nativeElement.getAttribute("send");
    this.messageAttr = this.element.nativeElement.getAttribute("message");
    this.urlAttr = this.element.nativeElement.getAttribute("url");
    this.methodAttr = this.element.nativeElement.getAttribute("method");

    //Check properties
    this.titleAttr = typeof this.titleAttr !== 'undefined' ? this.titleAttr : "Title";
    this.firstnameAttr = typeof this.firstnameAttr !== 'undefined' ? this.firstnameAttr : "First Name";
    this.lastnameAttr = typeof this.lastnameAttr !== 'undefined' ? this.lastnameAttr : "Last Name";
    this.emailAttr = typeof this.emailAttr !== 'undefined' ? this.emailAttr : "Email";
    this.sendAttr = typeof this.sendAttr !== 'undefined' ? this.sendAttr : "Send";
    this.messageAttr = typeof this.messageAttr !== 'undefined' ? this.messageAttr : "Message";
    this.urlAttr = typeof this.urlAttr !== 'undefined' ? this.urlAttr : "/send/";
    this.methodAttr = typeof this.methodAttr !== 'undefined' ? this.methodAttr : "POST";
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

    //Result to send email
    var result = <HTMLScriptElement>document.querySelector("#result");
    var result_card = <HTMLScriptElement>document.querySelector("#result_card");
    var progress = <HTMLScriptElement>document.querySelector(".tiny-contact-progress");

    //Hide elements
    result_card.style.display = "none";
    //Show progress
    progress.removeAttribute("style");

    //Chequed if the form is valid
    if(valid){
      //Parameters
      var creds = "firstname=" + form['firstname'] + "&lastname=" + form['lastname'];
      creds = creds + "&message=" + form['message'] + "&email=" + form['email'];

      //Send email
      fetch(this.urlAttr, {
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
          progress.style.display = "none";
        });
      })
      .catch(function (error) {
        result.innerHTML = "Error al procesar el formulario";
        //Show card message and hide progress
        result_card.style.display = "block";
        progress.style.display = "none";
      });
    }else{
      //Hide progress
      progress.style.display = "none";
    }
  }

}

//Load component
bootstrap(ComponentContactForm);
