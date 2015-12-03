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
        this.title = this.element.nativeElement.title;
        this.firstname = this.element.nativeElement.getAttribute("firstname");
        this.lastname = this.element.nativeElement.getAttribute("lastname");
        this.email = this.element.nativeElement.getAttribute("email");
        this.send = this.element.nativeElement.getAttribute("send");
        this.message = this.element.nativeElement.getAttribute("message");
        this.url = this.element.nativeElement.getAttribute("url");
        this.method = this.element.nativeElement.getAttribute("method");
        this.title = typeof this.title !== 'undefined' ? this.title : "Title";
        this.firstname = typeof this.firstname !== 'undefined' ? this.firstname : "First Name";
        this.lastname = typeof this.lastname !== 'undefined' ? this.lastname : "Last Name";
        this.email = typeof this.email !== 'undefined' ? this.email : "Email";
        this.send = typeof this.send !== 'undefined' ? this.send : "Send";
        this.message = typeof this.message !== 'undefined' ? this.message : "Message";
        this.url = typeof this.url !== 'undefined' ? this.url : "/send/";
        this.method = typeof this.method !== 'undefined' ? this.method : "POST";
    }
    ComponentContactForm.prototype.send_email = function (event, form) {
        event.preventDefault();
        var valid = true;
        for (var item in form) {
            if (form[item] == null || form[item] == "") {
                valid = false;
            }
        }
        if (valid) {
            var creds = "firstname=" + form['firstname'] + "&lastname=" + form['lastname'];
            creds = creds + "&message=" + form['message'] + "&email=" + form['email'];
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
                    var result = document.querySelector("#result");
                    result.innerHTML = message;
                });
            })
                .catch(function (error) {
                console.log('Request failed', error);
            });
        }
        else {
            console.log("invalid");
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
            templateUrl: "components/ng2-contact-form/template/contact-form.html"
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef, angular2_2.FormBuilder])
    ], ComponentContactForm);
    return ComponentContactForm;
})();
angular2_1.bootstrap(ComponentContactForm);
