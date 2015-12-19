"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var angular2_2 = require("angular2/angular2");
var angular2_3 = require('angular2/angular2');
var ComponentContactForm = (function () {
    function ComponentContactForm(element, fb) {
        this.element = element;
        this.myForm = fb.group({
            "firstname": ["", angular2_3.Validators.required],
            "lastname": ["", angular2_3.Validators.required],
            "email": ["", angular2_3.Validators.required],
            "message": ["", angular2_3.Validators.required],
        });
        this.firstname = this.myForm.controls['firstname'];
        this.lastname = this.myForm.controls['lastname'];
        this.email = this.myForm.controls['email'];
        this.message = this.myForm.controls['message'];
        this.titleAttr = this.element.nativeElement.title;
        this.firstnameAttr = this.element.nativeElement.getAttribute("firstname");
        this.lastnameAttr = this.element.nativeElement.getAttribute("lastname");
        this.emailAttr = this.element.nativeElement.getAttribute("email");
        this.sendAttr = this.element.nativeElement.getAttribute("send");
        this.messageAttr = this.element.nativeElement.getAttribute("message");
        this.urlAttr = this.element.nativeElement.getAttribute("url");
        this.methodAttr = this.element.nativeElement.getAttribute("method");
        this.titleAttr = typeof this.titleAttr !== 'undefined' ? this.titleAttr : "Title";
        this.firstnameAttr = typeof this.firstnameAttr !== 'undefined' ? this.firstnameAttr : "First Name";
        this.lastnameAttr = typeof this.lastnameAttr !== 'undefined' ? this.lastnameAttr : "Last Name";
        this.emailAttr = typeof this.emailAttr !== 'undefined' ? this.emailAttr : "Email";
        this.sendAttr = typeof this.sendAttr !== 'undefined' ? this.sendAttr : "Send";
        this.messageAttr = typeof this.messageAttr !== 'undefined' ? this.messageAttr : "Message";
        this.urlAttr = typeof this.urlAttr !== 'undefined' ? this.urlAttr : "/send/";
        this.methodAttr = typeof this.methodAttr !== 'undefined' ? this.methodAttr : "POST";
    }
    ComponentContactForm.prototype.send_email = function (event, form) {
        event.preventDefault();
        var valid = true;
        for (var item in form) {
            if (form[item] == null || form[item] == "") {
                valid = false;
            }
        }
        var result = document.querySelector("#result");
        var result_card = document.querySelector("#result_card");
        var progress = document.querySelector(".tiny-contact-progress");
        result_card.style.display = "none";
        progress.removeAttribute("style");
        if (valid) {
            var creds = "firstname=" + form['firstname'] + "&lastname=" + form['lastname'];
            creds = creds + "&message=" + form['message'] + "&email=" + form['email'];
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
                    result_card.style.display = "block";
                    progress.style.display = "none";
                });
            })
                .catch(function (error) {
                result.innerHTML = "Error al procesar el formulario";
                result_card.style.display = "block";
                progress.style.display = "none";
            });
        }
        else {
            progress.style.display = "none";
        }
    };
    ComponentContactForm = __decorate([
        angular2_1.Component({
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
        }),
        angular2_1.View({
            directives: [angular2_2.FORM_DIRECTIVES, angular2_2.NgIf],
            templateUrl: "/publics/components/ng2-contact-form/template/contact-form.html"
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef, angular2_2.FormBuilder])
    ], ComponentContactForm);
    return ComponentContactForm;
})();
angular2_1.bootstrap(ComponentContactForm);
