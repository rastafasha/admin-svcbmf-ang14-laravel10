import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionesComponent } from './conf/configuraciones/configuraciones.component';
import { RolesViewComponent } from './conf/roles/roles-view/roles-view.component';
import { ContactComponent } from './contact/contact.component';

//pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { DirectorioEditComponent } from './directorio/directorio-edit/directorio-edit.component';
import { DirectorioIndexComponent } from './directorio/directorio-index/directorio-index.component';
import { DirectorioViewPublicComponent } from './directorio/directorio-view-public/directorio-view-public.component';
import { DirectorioViewComponent } from './directorio/directorio-view/directorio-view.component';
import { HelpComponent } from './help/help.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UsersComponent } from './user/users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { DirectorioComponent } from '../components/directorio/directorio.component';
import { InstallPwaComponent } from './install-pwa/install-pwa.component';
import { CeoComponent } from './forms/ceo/ceo.component';
import { ConfiguracionComponent } from './conf/configuracion/configuracion.component';
import { FormsAfiliacionesComponent } from './forms/forms-afiliaciones/forms-afiliaciones.component';
import { FotoceoComponent } from './forms/fotoceo/fotoceo.component';
import { AfiliacionesComponent } from './manage/afiliaciones/afiliaciones.component';
import { CeomanageComponent } from './manage/ceomanage/ceomanage.component';
import { ConfiguracionMComponent } from './manage/configuracion-m/configuracion-m.component';
import { FotoceomanageComponent } from './manage/fotoceomanage/fotoceomanage.component';
import { FormsBancuadradoComponent } from './forms/forms-bancuadrado/forms-bancuadrado.component';
import { FormsBanhorizontalComponent } from './forms/forms-banhorizontal/forms-banhorizontal.component';
import { FormsBanverticalComponent } from './forms/forms-banvertical/forms-banvertical.component';
import { FormsBlogComponent } from './forms/forms-blog/forms-blog.component';
import { FormsDirregionalComponent } from './forms/forms-dirregional/forms-dirregional.component';
import { FormsDocumentosComponent } from './forms/forms-documentos/forms-documentos.component';
import { FormsGaleriaComponent } from './forms/forms-galeria/forms-galeria.component';
import { FormsPacientesComponent } from './forms/forms-pacientes/forms-pacientes.component';
import { FormsRevistaComponent } from './forms/forms-revista/forms-revista.component';
import { ManageBanncuadradoComponent } from './manage/manage-banncuadrado/manage-banncuadrado.component';
import { ManageBannhorizontalComponent } from './manage/manage-bannhorizontal/manage-bannhorizontal.component';
import { ManageBannverticalComponent } from './manage/manage-bannvertical/manage-bannvertical.component';
import { ManageBlogComponent } from './manage/manage-blog/manage-blog.component';
import { ManageDirregionalComponent } from './manage/manage-dirregional/manage-dirregional.component';
import { ManageDocumentosComponent } from './manage/manage-documentos/manage-documentos.component';
import { ManageGaleriaComponent } from './manage/manage-galeria/manage-galeria.component';
import { ManagePacientesComponent } from './manage/manage-pacientes/manage-pacientes.component';
import { ManageRevistaComponent } from './manage/manage-revista/manage-revista.component';
import { FormNewsintagramComponent } from './forms/form-newsintagram/form-newsintagram.component';
import { FormsAliadosComponent } from './forms/forms-aliados/forms-aliados.component';
import { FormsFormacionComponent } from './forms/forms-formacion/forms-formacion.component';
import { FormsSliderComponent } from './forms/forms-slider/forms-slider.component';
import { ManageAliadosComponent } from './manage/manage-aliados/manage-aliados.component';
import { ManageFormacionComponent } from './manage/manage-formacion/manage-formacion.component';
import { ManageSliderComponent } from './manage/manage-slider/manage-slider.component';
import { ManageTrabajoscComponent } from './manage/manage-trabajosc/manage-trabajosc.component';
import { NewsintagramComponent } from './manage/newsintagram/newsintagram.component';
import { ViewTrabajosComponent } from './vistas/vista-trabajos/view-trabajos.component';
import { ActualizacionesComponent } from './manage/actualizaciones/actualizaciones.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { FormActualizacionComponent } from './forms/form-actualizacion/form-actualizacion.component';
import { Categoria } from '../models/categoria';
import { CategoriaComponent } from './categoria/categoria.component';




const childRoutes: Routes = [

    { path: '',  component: DashboardComponent, data:{title:'Dashboard'} },
    //auth

    //configuraciones
    { path: 'configuraciones',  component: ConfiguracionesComponent, data:{title:'Configuraciones'} },
    { path: 'settings/edit/:id',  component: ConfiguracionComponent, data:{title:'Settings'} },

    { path: 'rolesconf', component: RolesViewComponent, data:{title:'Planes'} },
    { path: 'actualizaciones', component: ActualizacionesComponent, data:{title:'Actualizaciones'} },
    { path: 'actualizaciones/edit/:id', component: FormActualizacionComponent, data:{title:'Actualizaciones'} },

    
    //user
    { path: 'users', component: UsersComponent, data:{title:'Usuarios'} },
    { path: 'users/create', component: UserEditComponent, data:{title:'Detalle Usuario'} },
    { path: 'user/:id', component: UserProfileComponent, data:{title:'Detalle Usuario'} },
    { path: 'user/edit/:id', component: UserProfileComponent, data:{title:'Editar Usuario'} },
    { path: 'user/edit/:id', component: UserProfileComponent, data:{title:'Editar Usuario'} },
    // { path: 'user/edit/:id', component: UserDetailsComponent, data:{title:'Editar Usuario'} },
    { path: 'profile/:id',  component: ProfileComponent, data:{title:'Perfil'} },
    //directorio
    { path: 'directorio',  component: DirectorioIndexComponent, data:{title:'Directorio'} },
    { path: 'directorios',  component: DirectorioComponent, data:{title:'Directorio'} },
    { path: 'directorio/create', component: DirectorioEditComponent, data:{title:'Directorio Crear'} },
    { path: 'directorio/edit/:id', component: DirectorioEditComponent, data:{title:'Directorio Editar'} },
    { path: 'directorio/member/edit/:user_id', component: DirectorioEditComponent, data:{title:'Directorio Editar'} },
    { path: 'directorio/view/:id', component: DirectorioViewComponent, data:{title:'Directorio Editar'} },
    { path: 'directorio/view-public/:id', component: DirectorioViewPublicComponent, data:{title:'Directorio Publico'} },

    { path: 'search/:searchItem', component: UsersComponent, data:{title:'Buscar'} },
    { path: 'help', component: HelpComponent, data:{title:'Ayuda'} },
    { path: 'contact', component: ContactComponent, data:{title:'Contacto'} },
    { path: 'install-pwa', component: InstallPwaComponent, data:{title:'Contacto'} },

    {
      path: 'afiliaciones',
      //canActivate: [AuthGuard],
      component: AfiliacionesComponent
  },
  {
      path: 'afiliaciones/create',
      //canActivate: [AuthGuard],
      component: FormsAfiliacionesComponent
  },
  {
      path: 'afiliaciones/edit/:id',
      //canActivate: [AuthGuard],
      component: FormsAfiliacionesComponent
  },

  {
      path: 'configuracion',
      //canActivate: [AuthGuard],
      component: ConfiguracionMComponent
  },
  {
      path: 'configuracion/create',
      //canActivate: [AuthGuard],
      component: ConfiguracionComponent
  },
  {
      path: 'configuracion/edit/:id',
      //canActivate: [AuthGuard],
      component: ConfiguracionComponent
  },

  {
      path: 'ceo',
      //canActivate: [AuthGuard],
      component: CeomanageComponent
  },
  {
      path: 'ceo/create',
      //canActivate: [AuthGuard],
      component: CeoComponent
  },
  {
      path: 'ceo/edit/:id',
      //canActivate: [AuthGuard],
      component: CeoComponent
  },

  {
      path: 'fotoceo',
      //canActivate: [AuthGuard],
      component: FotoceomanageComponent
  },
  {
      path: 'fotoceo/create',
      //canActivate: [AuthGuard],
      component: FotoceoComponent
  },
  {
      path: 'fotoceo/edit/:id',
      //canActivate: [AuthGuard],
      component: FotoceoComponent
  },
  {
    path: 'blog',
    //canActivate: [AuthGuard],
    component: ManageBlogComponent
},
{
    path: 'blog/create',
    //canActivate: [AuthGuard],
    component: FormsBlogComponent
},
{
    path: 'blog/edit/:id',
    //canActivate: [AuthGuard],
    component: FormsBlogComponent
},
{ path: 'categorias', component: CategoriaComponent, data:{title:'Categoria'} },

{
    path: 'revista',
    //canActivate: [AuthGuard],
    component: ManageRevistaComponent
},
{
    path: 'revista/create',
    //canActivate: [AuthGuard],
    component: FormsRevistaComponent
},
{
    path: 'revista/edit/:id',
    //canActivate: [AuthGuard],
    component: FormsRevistaComponent
},

{
    path: 'galeria',
    //canActivate: [AuthGuard],
    component: ManageGaleriaComponent
},
{
    path: 'galeria/create',
    //canActivate: [AuthGuard],
    component: FormsGaleriaComponent
},
{
    path: 'galeria/edit/:id',
    //canActivate: [AuthGuard],
    component: FormsGaleriaComponent
},

{
    path: 'documentos',
    //canActivate: [AuthGuard],
    component: ManageDocumentosComponent
},
{
    path: 'documento/create',
    //canActivate: [AuthGuard],
    component: FormsDocumentosComponent
},
{
    path: 'documento/edit/:id',
    //canActivate: [AuthGuard],
    component: FormsDocumentosComponent
},

{
    path: 'banner-cuadrado',
    //canActivate: [AuthGuard],
    component: ManageBanncuadradoComponent
},
{
    path: 'banner-cuadrado/create',
    //canActivate: [AuthGuard],
    component: FormsBancuadradoComponent
},
{
    path: 'banner-cuadrado/edit/:id',
    //canActivate: [AuthGuard],
    component: FormsBancuadradoComponent
},

{
    path: 'banner-horizontal',
    //canActivate: [AuthGuard],
    component: ManageBannhorizontalComponent
},
{
    path: 'banner-horizontal/create',
    //canActivate: [AuthGuard],
    component: FormsBanhorizontalComponent
},
{
    path: 'banner-horizontal/edit/:id',
    //canActivate: [AuthGuard],
    component: FormsBanhorizontalComponent
},

{
    path: 'banner-vertical',
    //canActivate: [AuthGuard],
    component: ManageBannverticalComponent
},
{
    path: 'banner-vertical/create',
    //canActivate: [AuthGuard],
    component: FormsBanverticalComponent
},
{
    path: 'banner-vertical/edit/:id',
    //canActivate: [AuthGuard],
    component: FormsBanverticalComponent
},

{
    path: 'pacientes',
    //canActivate: [AuthGuard],
    component: ManagePacientesComponent
},
{
    path: 'pacientes/create',
    //canActivate: [AuthGuard],
    component: FormsPacientesComponent
},
{
    path: 'pacientes/edit/:id',
    //canActivate: [AuthGuard],
    component: FormsPacientesComponent
},

{
    path: 'dirregional',
    //canActivate: [AuthGuard],
    component: ManageDirregionalComponent
},
{
    path: 'dirregional/create',
    //canActivate: [AuthGuard],
    component: FormsDirregionalComponent
},
{
    path: 'dirregional/edit/:id',
    //canActivate: [AuthGuard],
    component: FormsDirregionalComponent
},
{
  path: 'trabajos',
  //canActivate: [AuthGuard],
  component: ManageTrabajoscComponent
},
{
  path: 'trabajos/view/:id',
  //canActivate: [AuthGuard],
  component: ViewTrabajosComponent
},

{
  path: 'slider',
  //canActivate: [AuthGuard],
  component: ManageSliderComponent
},
{
  path: 'slider/create',
  //canActivate: [AuthGuard],
  component: FormsSliderComponent
},
{
  path: 'slider/edit/:id',
  //canActivate: [AuthGuard],
  component: FormsSliderComponent
},

{
  path: 'aliados',
  //canActivate: [AuthGuard],
  component: ManageAliadosComponent
},
{
  path: 'aliados/create',
  //canActivate: [AuthGuard],
  component: FormsAliadosComponent
},
{
  path: 'aliados/edit/:id',
  //canActivate: [AuthGuard],
  component: FormsAliadosComponent
},

{
  path: 'news-instagram',
  //canActivate: [AuthGuard],
  component: NewsintagramComponent
},
{
  path: 'news-instagram/create',
  //canActivate: [AuthGuard],
  component: FormNewsintagramComponent
},
{
  path: 'news-instagram/edit/:id',
  //canActivate: [AuthGuard],
  component: FormNewsintagramComponent
},

{
  path: 'formacion',
  //canActivate: [AuthGuard],
  component: ManageFormacionComponent
},
{
  path: 'formacion/create',
  //canActivate: [AuthGuard],
  component: FormsFormacionComponent
},
{
  path: 'formacion/edit/:id',
  //canActivate: [AuthGuard],
  component: FormsFormacionComponent
},


    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: '**', component:  DashboardComponent },


]

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoute),
    RouterModule.forChild(childRoutes),
  ],
    exports: [ RouterModule ]
})
export class ChildRoutesModule { }
