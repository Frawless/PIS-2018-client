import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginComponent} from '../../login/login.component';
import {UserService} from '../../_authentication/_services';
import {User} from '../../_authentication/_models';
import {Globals} from '../../globals';
import {AlertService} from '../../_authentication/_services';
import {FormBuilder, Validators} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    @Input() user: User;
    username: string;
    currentUser: string;
    roles = ['ADMIN', 'USER', 'EMPLOYEE'];

    userForm: any = {};

    constructor(
        private loginComponent: LoginComponent,
        private userService: UserService,
        private globals: Globals,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private _location: Location
    ) {
    }

    ngOnInit() {
        this.currentUser = this.loginComponent.getCurrentUser();
        this.username = this.route.snapshot.paramMap.get('username');
        this.getUser(this.username);

    }

    getUser(username: string) {
        this.userService.getUser(username)
            .subscribe(user => {
                    this.user = user;
                    this.user.password = '';

                    if (this.user.address === null) {
                        this.user.address = {};
                        this.user.address.city = '';
                        this.user.address.streetName = '';
                        this.user.address.psc = '';
                    }

                },
                error => {
                    this.alertService.error(error);
                });
    }


    save(): void {
        this.userService.update(this.user)
            .subscribe(
                result => {
                    this.alertService.success('Uživatel upraven');
                },
                error => {
                    this.alertService.error('Uživatele nelze upravit!');
                });

        this.userService.updateRole(this.user)
            .subscribe();


    }

    delete(): void {
        this.userService.delete(this.user.id)
            .subscribe(
                result => {
                    this.alertService.success('Uživatel smazán');
                },
                error => {
                    this.alertService.error('Uživatele nelze smazat!');
                });
        this._location.back();
    }

    getOrderPrice(order): number {
        let totalPrice = 0;

        order.items.forEach(element => {
            totalPrice += this.getItemsPrice(element);
        });


        return totalPrice;
    }

    getItemsPrice(items): number {
        return items.countOrdered * items.product.price;
    }

    backClicked() {
        this._location.back();
    }
}
