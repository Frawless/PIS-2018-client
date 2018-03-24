import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  user: any = {};

  constructor(private loginComponent: LoginComponent) {
  }

  ngOnInit() {
      // TODO zmenit to getUserById zo service + getAllUser pre admina
      this.user = this.loginComponent.getCurrentUser();
      console.log(this.user);
  }

}
