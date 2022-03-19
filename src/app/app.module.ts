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
import { TecnicosListComponent } from './Admin/tecnicos-list/tecnicos-list.component';
import { PerfilTecnicosComponent } from './Admin/perfil-tecnicos/perfil-tecnicos.component';
import { ReportsTecnicosComponent } from './Admin/reports-tecnicos/reports-tecnicos.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {NgxPaginationModule} from 'ngx-pagination';



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
    UsersListComponent,
    TecnicosListComponent,
    PerfilTecnicosComponent,
    ReportsTecnicosComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DlDateTimeDateModule,  
    DlDateTimePickerModule,
    FormsModule,
    NgChartsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPaginationModule,
  ],
  providers: [FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
