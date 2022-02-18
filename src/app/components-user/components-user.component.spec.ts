import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsUserComponent } from './components-user.component';

describe('ComponentsUserComponent', () => {
  let component: ComponentsUserComponent;
  let fixture: ComponentFixture<ComponentsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
