import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsTecnicosComponent } from './reports-tecnicos.component';

describe('ReportsTecnicosComponent', () => {
  let component: ReportsTecnicosComponent;
  let fixture: ComponentFixture<ReportsTecnicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsTecnicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
