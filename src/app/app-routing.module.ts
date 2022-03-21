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

const routes: Routes = [
  /*Admin*/
  {path:'adminHome',component:ComponentsAdminComponent},
  {path:'reports/:id',component:ReportsComponent},
  {path: 'usuarios', component:UsersListComponent},
  {path: 'perfilTecnico', component:PerfilTecnicosComponent},
  {path: 'reprtsTecnico', component:ReportsTecnicosComponent},
  /*common*/
  {path:'modal',component:GenericModalComponent},
  {path:'login',component:LoginComponent},
  {path:'navigation',component:NavigationComponent},
  {path:'registro',component:RegistroComponent},
  /*User*/
  {path:'userHome',component:ComponentsUserComponent},
  {path:'perfilUser',component:PerfilUserComponent},
  {path:'newTicket',component:NewTicketComponent},
  {path:'buzon',component:ComplaintsMailboxComponent},
  {path:'tecnicos',component:TecnicosListComponent},
/*Rutas por defecto*/
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'**',redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
