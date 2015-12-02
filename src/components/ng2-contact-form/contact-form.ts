/// <reference path="../../declare/whatwg-fetch.d.ts" />

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
      //Send email
      fetch(this.url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fistname: form['firstname'],
          lastname: form['lastname'],
          message: form['message'],
          email: form['email']
        })
      }).then(function(response) {
        var data = response.text();
        data.then(function(message){
          var result = <HTMLScriptElement>document.querySelector("#result");
          result.innerHTML = message;
        })
      });
    }else{
      console.log("invalid");
    }

  }

}

//Load component
bootstrap(ComponentContactForm);
