import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsMailboxComponent } from './complaints-mailbox.component';

describe('ComplaintsMailboxComponent', () => {
  let component: ComplaintsMailboxComponent;
  let fixture: ComponentFixture<ComplaintsMailboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintsMailboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsMailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
