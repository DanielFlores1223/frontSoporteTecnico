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


const routes: Routes = [
  /*Admin*/
  {path:'adminHome',component:ComponentsAdminComponent, canActivate: [ComponentsAdminComponent]},
  {path:'reports',component:ReportsComponent, canActivate: [ReportsComponent]},
  /*common*/
  {path:'modal',component:GenericModalComponent, canActivate: [GenericModalComponent]},
  {path:'loguin',component:LoginComponent, canActivate: [LoginComponent]},
  {path:'navigation',component:NavigationComponent, canActivate: [NavigationComponent]},
  {path:'registro',component:RegistroComponent, canActivate: [RegistroComponent]},
  /*User*/
  {path:'userHome',component:ComponentsUserComponent, canActivate: [ComponentsUserComponent]},
  {path:'perfilUser',component:PerfilUserComponent, canActivate: [PerfilUserComponent]},
/*Rutas por defecto*/
  {path:'',redirectTo:'paginaprincipal', pathMatch:'full'},
  {path:'**',redirectTo:'paginaprincipal', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
