import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../model/auth.service";

@Component({
    templateUrl: "auth.component.html"
})
export class AuthComponent {
    username?: string;
    password?: string;
    errorMessage?: string;

    constructor(private router: Router, private auth: AuthService) { }

    authenticate(form: NgForm) {
        if (form.valid) {
            this.auth.authenticate(this.username ?? "", this.password ?? "")
                .subscribe(
                    response => {
                        if (response) {
                            this.router.navigateByUrl("/admin/main");
                        } else {
                            this.errorMessage = "Authentication Failed"; // Move this inside the failure case
                        }
                    },
                    error => {
                        // Handle errors from the authentication service
                        this.errorMessage = "Authentication Failed"; // Set a user-friendly error message
                    }
                );
        } else {
            this.errorMessage = "Form Data Invalid";
        }
    }
}
