import { Component, OnInit, Input } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../../../_authentication/_services/user.service';
import { User } from '../../../_authentication/_models/user';
import { AlertService } from '../../../_authentication/_services/index';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    users: User[];

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
  }


  getUsers(): void { // TODO: hadze chybu - opravit
    /*this.users = this.userService.getUsers()
            .subscribe((users:User[]) => this.users = users);*/
      }

}
