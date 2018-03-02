import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { AlertService, UserService } from "../_authentication/_services/index";
import { Router } from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()],

    moduleId: module.id.toString(),
})
export class SignupComponent implements OnInit {
    model: any = {};
    loading = false;
    title="Bakery";

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {}

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
