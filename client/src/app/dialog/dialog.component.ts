import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import {Globals} from '../globals';
import {AlertService} from '../_authentication/_services/alert.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  exportAs: 'dialog',
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class DialogComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
      private globals: Globals,
      private alertService: AlertService,
  ) { }

  ngOnInit() { }

  close() {
    this.visible = false;
    this.globals.alertLogin = false;
    this.visibleChange.emit(this.visible);
    this.alertService.clearAlert();
  }
}
