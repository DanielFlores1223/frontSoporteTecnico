import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsAdminComponent } from './Admin/components-admin/components-admin.component';
import { ReportsComponent } from './Admin/reports/reports.component';
import { GenericModalComponent } from './Common/generic-modal/generic-modal.component';
import { LoginComponent } from './Common/login/login.component';
import { NavigationComponent } from './Common/navigation/navigation.component';
import { RegistroComponent } from './Common/registro/registro.component';
import { ComponentsUserComponent } from './User/components-user/components-user.component';
import { PerfilUserComponent } from './User/perfil-user/perfil-user.component';
import { NewTicketComponent } from './User/new-ticket/new-ticket.component';
import { UsersListComponent } from './Admin/users-list/users-list.component';
import { ComplaintsMailboxComponent } from './User/complaints-mailbox/complaints-mailbox.component';
import { TecnicosListComponent } from './Admin/tecnicos-list/tecnicos-list.component';
import { PerfilTecnicosComponent } from './Admin/perfil-tecnicos/perfil-tecnicos.component';
import { ReportsTecnicosComponent } from './Admin/reports-tecnicos/reports-tecnicos.component';

//GUARDS
import { NoLoguedGuard } from './Guards/no-logued.guard';
import { EmployeeGuard } from './Guards/employee.guard';
import { AdminGuard } from './Guards/admin.guard';
import { LoguedGuard } from './Guards/logued.guard';

const routes: Routes = [
  /*Admin*/
  {path:'adminHome',component:ComponentsAdminComponent, canActivate:[NoLoguedGuard, AdminGuard],},
  {path:'reports/:id',component:ReportsComponent, canActivate:[NoLoguedGuard, AdminGuard]},
  {path: 'usuarios', component:UsersListComponent, canActivate:[NoLoguedGuard, AdminGuard]},
  {path: 'perfilTecnico', component:PerfilTecnicosComponent, canActivate:[NoLoguedGuard, AdminGuard]},
  {path: 'reprtsTecnico', component:ReportsTecnicosComponent, canActivate:[NoLoguedGuard, AdminGuard]},
  /*common*/
  {path:'modal',component:GenericModalComponent, canActivate: [LoguedGuard]},
  {path:'login',component:LoginComponent, canActivate: [LoguedGuard]},
  {path:'navigation',component:NavigationComponent, canActivate: [LoguedGuard]},
  {path:'registro',component:RegistroComponent, canActivate: [LoguedGuard]},
  /*User*/
  {path:'userHome',component:ComponentsUserComponent, canActivate:[NoLoguedGuard, EmployeeGuard]},
  {path:'perfilUser',component:PerfilUserComponent, canActivate:[NoLoguedGuard]},
  {path:'newTicket',component:NewTicketComponent, canActivate:[NoLoguedGuard, EmployeeGuard]},
  {path:'buzon',component:ComplaintsMailboxComponent, canActivate:[NoLoguedGuard, EmployeeGuard]},
  {path:'tecnicos',component:TecnicosListComponent, canActivate:[NoLoguedGuard, EmployeeGuard]},
/*Rutas por defecto*/
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'**',redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
