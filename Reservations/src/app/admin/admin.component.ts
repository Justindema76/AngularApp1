import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../model/auth.service";
import { FormsModule } from "@angular/forms";

@Component({
    templateUrl: "admin.component.html"
})
export class AdminComponent {

    constructor(private auth: AuthService,
                private router: Router) { }

                logout() {
                    this.auth.clear();
                    // Optional: show a confirmation message
                    alert("You have been logged out successfully.");
                    this.router.navigateByUrl("/");
                }
                
}
