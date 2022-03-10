import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilTecnicosComponent } from './perfil-tecnicos.component';

describe('PerfilTecnicosComponent', () => {
  let component: PerfilTecnicosComponent;
  let fixture: ComponentFixture<PerfilTecnicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilTecnicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
