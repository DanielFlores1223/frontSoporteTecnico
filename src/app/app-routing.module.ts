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

const routes: Routes = [
  /*Admin*/
  {path:'adminHome',component:ComponentsAdminComponent},
  {path:'reports',component:ReportsComponent},
  {path: 'usuarios', component:UsersListComponent},
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
  
/*Rutas por defecto*/
  {path:'',redirectTo:'paginaprincipal', pathMatch:'full'},
  {path:'**',redirectTo:'paginaprincipal', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
