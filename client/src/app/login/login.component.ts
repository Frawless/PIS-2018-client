import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';


import { AlertService, AuthenticationService } from '../_authentication/_services/index';
import {UserService} from '../_authentication/_services/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Globals} from '../globals';

import * as jwtDecode from 'jwt-decode';

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
    currentUser: string;

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
        this.showLogin = false;
        // Login validators
        this.credentials = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]

        });
        // Registration validators
        this.registration = this.formBuilder.group({
            firstname: ['', [Validators.required, Validators.maxLength(40)]],
            lastname: ['', [Validators.required, Validators.maxLength(40)]],
            username: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(3)]],
            email: ['', [Validators.email, Validators.required]],
            password: ['', Validators.required],
            phoneNumber: ['']
            // @TODO jstejska: add min-length validator for password and regex validator for names

        });

        // Loading current user
        if  (localStorage.getItem('token') != null) {
            // this.globals.currentRole = localStorage.getItem('role');
            this.showLoginButton = false;
            this.getUserFromToken();
        }

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    getUserFromToken() {
        const token = localStorage.getItem('token');
        if (token) {
            this.currentUser =  jwtDecode(token).sub;
        }
    }

    getCurrentRoleFromToken() {
        const token = localStorage.getItem('token');
        if (token) {
            this.globals.currentRole = jwtDecode(token).roles[0].authority;
        }
        else{
            this.globals.currentRole = 'USER';
        }

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
                    this.getUserFromToken();
                    this.getCurrentRoleFromToken();
                    this.alertService.success('Login was successful');

                },
                error => {
                    this.alertService.error(error);
                    this.loginLoading = false;
                });
                console.log(this.credentials.controls.username.value);
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
        this.getCurrentRoleFromToken();
        this.showLogin = false;
        this.showLoginButton = true;
        this.loginLoading = false;
        this.credentials.reset();
        this.registration.reset();
        this.globals.currentRole = 'USER';
        console.log('Logged out, storage is: ' + localStorage.getItem('token'));
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
