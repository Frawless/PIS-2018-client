import {Component, OnInit, Input, SimpleChanges} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';


import { AlertService, AuthenticationService } from '../_authentication/_services/index';
import {UserService} from '../_authentication/_services/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import {DataService, Globals} from '../globals';
import {Roles} from '../globals';

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
    currentRole: string;

    showLoginButton: boolean;

    iddleLogout = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private globals: Globals,
        private data: DataService) {
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
            // @TODO jstejska: add min-length validator for password and regex validator for nam
        });

        // Loading current user
        if  (localStorage.getItem('token') != null) {
            // this.globals.currentRole = localStorage.getItem('role');
            this.showLoginButton = false;
            this.getUserFromToken();
            this.getCurrentRoleFromToken();
        }

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        // Subscribe for iddleLogout messages
        this.data.iddleLogout.subscribe(message => {
            this.iddleLogout = message;
            if (this.iddleLogout){
                this.logout();}
          });
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
            const role = jwtDecode(token).roles[0].authority;
            if (role === 'USER') {
                this.globals.currentRole = Roles.USER;
            } else if (role === 'EMPLOYEE') {
                this.globals.currentRole = Roles.EMPLOYEE;
            } else if (role === 'ADMIN') {
                this.globals.currentRole = Roles.ADMIN;
            } else {
                this.globals.currentRole = Roles.NOTLOGED;
            }
        } else {
            this.globals.currentRole = Roles.NOTLOGED;
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
                    this.alertService.error('Username or password is not correct!');
                    this.loginLoading = false;
                });
                console.log(this.credentials.controls.username.value);
    }

    register() {
        // Form validity check
        if (!this.registration.valid) {
            this.alertService.error('Registrační formulář není validní!');
            return;
        }

        this.registrationLoading = true;

        // Submit - not working now
        this.userService.create(this.registration.value)
            .subscribe(
                data => {
                    this.alertService.success('Registrace proběhla úspěšně!', true);
                    this.router.navigate([this.router.url]);
                    this.registrationLoading = false;
                    this.registration.reset();

                },
                error => {
                    this.alertService.error('Uživatelské jméno \'' + this.registration.value.username + '\' je již obsazeno!');
                    this.registrationLoading = false;
                });
    }

    logout() {
        this.logoutRedirect();
        this.authenticationService.logout();
        this.showLogin = false;
        this.showLoginButton = true;
        this.loginLoading = false;
        this.credentials.reset();
        this.registration.reset();
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

    getCurrentUser() {
      this.getUserFromToken();
      return this.currentUser;

    }

    logoutRedirect() {
        this.getCurrentRoleFromToken();
        if ((this.globals.currentRole >= Roles.USER )
                && (this.router.url.indexOf('admin') > -1
                || this.router.url.indexOf('user') > -1)) {
            this.router.navigateByUrl('/');
        }
        this.globals.currentRole = Roles.NOTLOGED;
    }
}
