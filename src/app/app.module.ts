import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
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
import { NewTicketComponent } from './User/new-ticket/new-ticket.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { FormsModule } from '@angular/forms';
import { ComplaintsMailboxComponent } from './User/complaints-mailbox/complaints-mailbox.component';
import { UsersListComponent } from './Admin/users-list/users-list.component';

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
    PerfilUserComponent,
    NewTicketComponent,
    ComplaintsMailboxComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DlDateTimeDateModule,  
    DlDateTimePickerModule,
    FormsModule,
    NgChartsModule,
  ],
  providers: [FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
