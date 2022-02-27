import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Common/login/login.component';
import { RegistroComponent } from './Common/registro/registro.component';
import { ComponentsAdminComponent } from './Admin/components-admin/components-admin.component';
import { ComponentsUserComponent } from './User/components-user/components-user.component';
import { NavigationComponent } from './Common/navigation/navigation.component';
import { ReportsComponent } from './Admin/reports/reports.component';
import { GenericModalComponent } from './Common/generic-modal/generic-modal.component';
import { PerfilUserComponent } from './User/perfil-user/perfil-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    ComponentsAdminComponent,
    ComponentsUserComponent,
    NavigationComponent,
    ReportsComponent,
    GenericModalComponent,
    PerfilUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
