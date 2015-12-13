import {bootstrap, Component, ElementRef, View} from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, AbstractControl, ControlGroup, NgIf} from "angular2/angular2";
import {Validators} from 'angular2/angular2';

@Component({
  selector: 'form-login'
})
@View({
  directives: [FORM_DIRECTIVES, NgIf],
  templateUrl: "components/ng2-form-login/template/form-login.html"
})
class ComponentFormLogin {
  private myForm: ControlGroup;
  password: AbstractControl;
  email: AbstractControl;

  constructor(private element:ElementRef, fb: FormBuilder) {
    //For validate form
    this.myForm = fb.group({
      "password":  ["", Validators.required],
      "email":  ["", Validators.required],
    });

    //Control validation
    this.email = this.myForm.controls['email'];
    this.password = this.myForm.controls['password'];

  }

  //This method valid data form and send data login
  send_data_login(event, form){
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
      var creds = "password=" + form['password'] + "&email=" + form['email'];

      //Send email
      fetch("login", {
        method: 'POST',
        //This is for send cookies and sessions
        credentials: 'same-origin',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: creds
      })
      .then(function (data) {
        var res = data.text();
        res.then(function (message) {
          if(message.trim() == "Login incorrecto."){
            result.innerHTML = message;
            //Show card message and hide progress
            result_card.style.display = "block";
            progress.style.display = "none";
          }else{
            window.location.href = "/admin";
          }
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
bootstrap(ComponentFormLogin);
