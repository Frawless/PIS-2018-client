import { Component, OnInit, Input } from '@angular/core';
import { Router} from '@angular/router';
import { LoginComponent } from '../../login/login.component';
import { UserService } from '../../_authentication/_services/user.service';
import { User } from '../../_authentication/_models/user';
import { AlertService } from '../../_authentication/_services/index';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  @Input() user: User;
  username: string;
  roles = ['Admin','User','Employee'];

  constructor(
    private loginComponent: LoginComponent,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
      this.username = this.loginComponent.getCurrentUser();
      this.getCurrentUser(this.username);
  }

  getCurrentUser(username: string){
      this.userService.getCurrentUser(username).subscribe(user => this.user = user);
  }


  save(): void {console.log(this.user);
        this.userService.update(this.user)
            .subscribe();
    }

}
