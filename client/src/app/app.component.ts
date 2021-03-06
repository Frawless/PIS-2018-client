import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';

import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {LoginComponent} from './login/login.component';

import {DataService, Globals} from './globals';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;
    arrivedMessage: boolean;

    constructor(private idle: Idle, private keepalive: Keepalive, private data: DataService, private globals: Globals) {
        // sets an idle timeout of 5 seconds, for testing purposes.
        idle.setIdle(30);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        idle.setTimeout(1730);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
        idle.onTimeout.subscribe(() => {
            this.timedOut = true;
            if (this.globals.currentRole >= 1) {
                this.data.changeMessage(this.timedOut);
                this.reset();
            }
        });

        idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
        idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

        // sets the ping interval to 15 seconds
        keepalive.interval(15);

        keepalive.onPing.subscribe(() => this.lastPing = new Date());

        this.reset();
    }

    ngOnInit() {
      this.data.iddleLogout.subscribe(message => this.arrivedMessage = message);
    }

    reset() {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
    }
}
