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
var ComponentFormLogin = (function () {
    function ComponentFormLogin(element, fb) {
        this.element = element;
        this.myForm = fb.group({
            "password": ["", angular2_3.Validators.required],
            "email": ["", angular2_3.Validators.required],
        });
        this.email = this.myForm.controls['email'];
        this.password = this.myForm.controls['password'];
    }
    ComponentFormLogin.prototype.send_data_login = function (event, form) {
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
            var creds = "password=" + form['password'] + "&email=" + form['email'];
            fetch("login", {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: creds
            })
                .then(function (data) {
                var res = data.text();
                res.then(function (message) {
                    if (message.trim() == "Login incorrecto.") {
                        result.innerHTML = message;
                        result_card.style.display = "block";
                        progress.style.display = "none";
                    }
                    else {
                        window.location.href = "/admin";
                    }
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
    ComponentFormLogin = __decorate([
        angular2_1.Component({
            selector: 'form-login'
        }),
        angular2_1.View({
            directives: [angular2_2.FORM_DIRECTIVES, angular2_2.NgIf],
            templateUrl: "/publics/components/ng2-form-login/template/form-login.html"
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef, angular2_2.FormBuilder])
    ], ComponentFormLogin);
    return ComponentFormLogin;
})();
angular2_1.bootstrap(ComponentFormLogin);
