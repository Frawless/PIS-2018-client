import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { LoginComponent } from '../../login/login.component';
import { UserService } from '../../_authentication/_services/user.service';
import { User } from '../../_authentication/_models/user';
import {Globals} from '../../globals';
import { AlertService } from '../../_authentication/_services/index';

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

  constructor(
    private loginComponent: LoginComponent,
    private userService: UserService,
    private globals: Globals,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
      this.currentUser = this.loginComponent.getCurrentUser();
      this.username = this.route.snapshot.paramMap.get('username');
      this.getUser(this.username);
  }

  getUser(username: string) {
      this.userService.getUser(username)
          .subscribe(user => {
            this.user = user,
            this.user.password = "";
          });
  }


  save(): void {//console.log(this.user);
        this.userService.update(this.user)
            .subscribe();

        this.userService.updateRole(this.user)
            .subscribe();
    }

  delete(): void {
        this.userService.delete(this.user.id)
            .subscribe();
        this.router.navigate(['/shop/admin/users']);
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

}