import { Routes } from '@angular/router';

import { AdminGuard } from './guards/admin.guard';

import { SharedLoginRoutedComponent } from './component/shared/shared.login.routed/shared.login.routed';
import { SharedLogoutRoutedComponent } from './component/shared/shared.logout.routed/shared.logout.routed';
import { SharedByemailRoutedComponent } from './component/shared/shared.byemail.routed/shared.byemail.routed.component';
import { SharedHomeRoutedComponent } from './component/shared/shared.home.routed/shared.home.routed.component';

import { UsuarioAdminViewRoutedComponent } from './component/usuario/usuario.admin.view.routed/usuario.admin.view.routed.component';
import { UsuarioAdminEditRoutedComponent } from './component/usuario/usuario.admin.edit.routed/usuario.admin.edit.routed.component';
import { UsuarioAdminCreateRoutedComponent } from './component/usuario/usuario.admin.create.routed/usuario.admin.create.routed.component';
import { UsuarioAdminPlistRoutedComponent } from './component/usuario/usuario.admin.plist.routed/usuario.admin.plist.routed.component';
import { UsuarioAdminDeleteRoutedComponent } from './component/usuario/usuario.admin.delete.routed/usuario.admin.delete.component';
import { UsuarioXTipousuarioAdminPlistRoutedComponent } from './component/usuario/usuario.xtipousuario.admin.plist.routed/usuario.xtipousuario.admin.plist.routed.component';

import { TipousuarioAdminPlistRoutedComponent } from './component/tipousuario/tipousuario.admin.plist.routed/tipousuario.admin.plist.routed.component';
import { TipousuarioAdminEditRoutedComponent } from './component/tipousuario/tipousuario.admin.edit.routed/tipousuario.admin.edit.routed.component';
import { TipousuarioAdminViewRoutedComponent } from './component/tipousuario/tipousuario.admin.view.routed/tipousuario.admin.view.routed.component';
import { TipousuarioAdminCreateRoutedComponent } from './component/tipousuario/tipousuario.admin.create.routed/tipousuario.admin.create.routed.component';
import { TipousuarioAdminDeleteRoutedComponent } from './component/tipousuario/tipousuario.admin.delete.routed/tipousuario.admin.delete.component';

import { ProductoAdminPlistRoutedComponent } from './component/producto/producto.admin.plist.routed/producto.admin.plist.routed.component';
import { ProductoAdminEditRoutedComponent } from './component/producto/producto.admin.edit.routed/producto.admin.edit.routed.component';  
import { ProductoAdminViewRoutedComponent } from './component/producto/producto.admin.view.routed/producto.admin.view.routed.component';
import { ProductoAdminCreateRoutedComponent } from './component/producto/producto.admin.create.routed/producto.admin.create.routed.component';
import { ProductoAdminDeleteRoutedComponent } from './component/producto/producto.admin.delete.routed/producto.admin.delete.component';
import { ProductoselectorComponent } from './component/producto/productoselector/productoselector.component';

import { ZonaAdminPlistRoutedComponent } from './component/zona/zona.admin.plist.routed/zona.admin.plist.routed.component';
import { ZonaAdminEditRoutedComponent } from './component/zona/zona.admin.edit.routed/zona.admin.edit.routed.component';
import { ZonaAdminViewRoutedComponent } from './component/zona/zona.admin.view.routed/zona.admin.view.routed.component';
import { ZonaAdminCreateRoutedComponent } from './component/zona/zona.admin.create.routed/zona.admin.create.routed.component';
import { ZonaAdminDeleteRoutedComponent } from './component/zona/zona.admin.delete.routed/zona.admin.delete.component';
import { ZonaselectorComponent } from './component/zona/zonaselector/zonaselector.component';

import { BonoAdminCreateRoutedComponent } from './component/bono/bono.admin.create.routed/bono.admin.create.routed.component';
import { BonoAdminPlistRoutedComponent } from './component/bono/bono.admin.plist.routed/bono.admin.plist.routed.component';
import { BonoAdminEditRoutedComponent } from './component/bono/bono.admin.edit.routed/bono.admin.edit.routed.component';
import { BonoAdminViewRoutedComponent } from './component/bono/bono.admin.view.routed/bono.admin.view.routed.component';
import { BonoAdminDeleteRoutedComponent } from './component/bono/bono.admin.delete.routed/bono.admin.delete.component';

import { GcontrataAdminCreateRoutedComponent } from './component/gcontrata/gcontrata.admin.create.routed/gcontrata.admin.create.routed.component';
import { GcontrataAdminPlistRoutedComponent } from './component/gcontrata/gcontrata.admin.plist.routed/gcontrata.admin.plist.routed.component';
import { GcontrataAdminEditRoutedComponent } from './component/gcontrata/gcontrata.admin.edit.routed/gcontrata.admin.edit.routed.component';
import { GcontrataAdminViewRoutedComponent } from './component/gcontrata/gcontrata.admin.view.routed/gcontrata.admin.view.routed.component';
import { GcontrataAdminDeleteRoutedComponent } from './component/gcontrata/gcontrata.admin.delete.routed/gcontrata.admin.delete.component';
import { GcontrataXUsuarioAdminPlistRoutedComponent } from './component/gcontrata/gcontrata.xusuario.admin.plist.routed/gcontrata.xusuario.admin.plist.routed.component';

import { serverURL } from './environment/environment';
import { LoadingGuard } from './guards/lodingScreen.guard';

export const routes: Routes = [
  { path: '', component: SharedHomeRoutedComponent },
  { path: 'home', component: SharedHomeRoutedComponent },
  { path: 'login', component: SharedLoginRoutedComponent },
  { path: 'logout', component: SharedLogoutRoutedComponent },
  { path: 'byemail/:email', component: SharedByemailRoutedComponent },

  {
    path: 'admin/usuario/plist',
    component: UsuarioAdminPlistRoutedComponent,
    canActivate: [AdminGuard, LoadingGuard], 
  },
  {
    path: 'admin/usuario/edit/:id',
    component: UsuarioAdminEditRoutedComponent,
    canActivate: [AdminGuard, LoadingGuard],
  },
  {
    path: 'admin/usuario/view/:id',
    component: UsuarioAdminViewRoutedComponent,
    canActivate: [AdminGuard, LoadingGuard],
  },
  {
    path: 'admin/usuario/create',
    component: UsuarioAdminCreateRoutedComponent,
    canActivate: [AdminGuard, LoadingGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin/usuario/delete/:id',
    component: UsuarioAdminDeleteRoutedComponent,
    canActivate: [AdminGuard, LoadingGuard],
  },
  {
    path: 'admin/usuario/plist/xtipousuario/:id',
    component: UsuarioXTipousuarioAdminPlistRoutedComponent,
    canActivate: [AdminGuard, LoadingGuard],
  },

  {
    path: 'admin/tipousuario/plist',
    component: TipousuarioAdminPlistRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/tipousuario/edit/:id',
    component: TipousuarioAdminEditRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/tipousuario/view/:id',
    component: TipousuarioAdminViewRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/tipousuario/create',
    component: TipousuarioAdminCreateRoutedComponent,
    canActivate: [AdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin/tipousuario/delete/:id',
    component: TipousuarioAdminDeleteRoutedComponent,
    canActivate: [AdminGuard],
  },

  {
    path: 'admin/producto/plist',
    component: ProductoAdminPlistRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/producto/edit/:id',
    component: ProductoAdminEditRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/producto/view/:id',
    component: ProductoAdminViewRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/producto/create',
    component: ProductoAdminCreateRoutedComponent,
    canActivate: [AdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin/producto/delete/:id',
    component: ProductoAdminDeleteRoutedComponent,
    canActivate: [AdminGuard],
  },

  {
    path: 'Productoselector',
    component: ProductoselectorComponent,
  },

  {
    path: 'admin/zona/plist',
    component: ZonaAdminPlistRoutedComponent,
    canActivate: [AdminGuard, LoadingGuard],
  },
  {
    path: 'admin/zona/edit/:id',
    component: ZonaAdminEditRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/zona/view/:id',
    component: ZonaAdminViewRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/zona/create',
    component: ZonaAdminCreateRoutedComponent,
    canActivate: [AdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin/zona/delete/:id',
    component: ZonaAdminDeleteRoutedComponent,
    canActivate: [AdminGuard],
  },

  {
    path: 'zonaselector',
    component: ZonaselectorComponent,
  },

  {
    path: 'admin/bono/plist',
    component: BonoAdminPlistRoutedComponent,
    canActivate: [AdminGuard, LoadingGuard],
  },
  {
    path: 'admin/bono/edit/:id',
    component: BonoAdminEditRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/bono/view/:id',
    component: BonoAdminViewRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/bono/create',
    component: BonoAdminCreateRoutedComponent,
    canActivate: [AdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin/bono/delete/:id',
    component: BonoAdminDeleteRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/gcontrata/plist',
    component: GcontrataAdminPlistRoutedComponent,
    canActivate: [AdminGuard, LoadingGuard],
  },
  {
    path: 'admin/gcontrata/edit/:id',
    component: GcontrataAdminEditRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/gcontrata/view/:id',
    component: GcontrataAdminViewRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/gcontrata/create',
    component: GcontrataAdminCreateRoutedComponent,
    canActivate: [AdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin/gcontrata/delete/:id',
    component: GcontrataAdminDeleteRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/gcontrata/xusuario/plist/:id',
    component: GcontrataXUsuarioAdminPlistRoutedComponent,
    canActivate: [AdminGuard],
  }
];
