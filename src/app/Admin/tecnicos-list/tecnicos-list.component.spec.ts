import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicosListComponent } from './tecnicos-list.component';

describe('TecnicosListComponent', () => {
  let component: TecnicosListComponent;
  let fixture: ComponentFixture<TecnicosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TecnicosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
