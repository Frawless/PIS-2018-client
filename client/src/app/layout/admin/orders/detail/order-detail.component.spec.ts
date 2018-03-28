import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdertDetailComponent } from './order-detail.component';

describe('OrdertDetailComponent', () => {
  let component: OrdertDetailComponent;
  let fixture: ComponentFixture<OrdertDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdertDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdertDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
