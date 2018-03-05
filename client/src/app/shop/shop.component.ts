import { Component, OnInit } from '@angular/core';
import {Globals} from "../globals";
import { AlertService, AuthenticationService } from '../_authentication/_services/index';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(
      private globals: Globals,
      private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  jebat(){
      this.alertService.error("Jebu na to");
  }

}
