import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';


import { AlertService, AuthenticationService } from '../_authentication/_services/index';
import {UserService} from '../_authentication/_services/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Globals} from '../globals';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()],

    moduleId: module.id.toString(),
})
export class LoginComponent implements OnInit {
    @Input() showLogin = true;

    credentials: any = {};
    registration: any = {};
    loginLoading = false;
    registrationLoading = false;
    returnUrl: string;

    showLoginButton: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private globals: Globals) {
    }

    // @TODO check this
    // https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/
    ngOnInit() {
        this.showLoginButton = true;
        // Login validators
        this.credentials = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]

        });
        // Registration validators
        this.registration = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(40)]],
            surname: ['', [Validators.required, Validators.maxLength(40)]],
            username: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(4)]],
            email: ['', [Validators.email, Validators.required]],
            password: ['', Validators.required],
            phoneNumber: ['']
            // @TODO jstejska: add min-length validator for password and regex validator for names

        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        // Form validity check
        if (!this.credentials.valid) {
            this.alertService.error('Login form is not valid');
            return;
        }

        this.loginLoading = true;

        this.authenticationService.login(this.credentials.value)
            .subscribe(
                data => {
                    this.router.navigate([this.router.url]);
                    this.showLogin = false;
                    this.showLoginButton = false;
                    this.dismissLoginDialog();
                    this.globals.currentRole = localStorage.getItem('role');
                    this.alertService.success('Login was successful');

                },
                error => {
                    this.alertService.error(error);
                    this.loginLoading = false;
                });
    }

    register() {
        // Form validity check
        if (!this.registration.valid) {
            this.alertService.error('Registration form is not valid');
            return;
        }

        this.registrationLoading = true;

        // Submit - not working now
        this.userService.create(this.registration.value)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate([this.router.url]);
                    this.registrationLoading = false;
                    this.registration.reset();
                },
                error => {
                    this.alertService.error(error);
                    this.registrationLoading = false;
                });
    }

    logout() {
        this.authenticationService.logout();
        this.showLogin = false;
        this.showLoginButton = true;
        this.loginLoading = false;
        this.credentials.reset();
        this.registration.reset();
        this.globals.currentRole = 'USER';
        console.log('Logged out, storage is: ' + localStorage.getItem('user'));
    }

    showLoginDialog() {
        this.alertService.clearAlert();
        this.globals.alertLogin = true;
        this.showLogin = true;
    }

    dismissLoginDialog() {
        // this.alertService.clearAlert();
        this.globals.alertLogin = false;
    }
}
