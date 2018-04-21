import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../../../_authentication/_services/user.service';
import { User } from '../../../_authentication/_models/user';
import { AlertService } from '../../../_authentication/_services/index';
import {MatSort, MatSortable, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource;
  displayedColumns = ['username', 'firstname', 'lastname', 'roleName'];

  users: User[];

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
  }


  getUsers(): void {
    this.userService.getUsers()
            .subscribe((users:User[]) => {
            this.users = users
               .map( (users)=> {
                    users.roleName = users.role.name;
                    return users;
                });
            this.dataSource = new MatTableDataSource(users);
            this.dataSource.sort = this.sort;
          });
      }

}
