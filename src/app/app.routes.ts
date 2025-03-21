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

import { BebidaAdminCreateRoutedComponent } from './component/bebida/bebida.admin.create.routed/bebida.admin.create.routed.component';
import { BebidaAdminPlistRoutedComponent } from './component/bebida/bebida.admin.plist.routed/bebida.admin.plist.routed.component';
import { BebidaAdminEditRoutedComponent } from './component/bebida/bebida.admin.edit.routed/bebida.admin.edit.routed.component';
import { BebidaAdminViewRoutedComponent } from './component/bebida/bebida.admin.view.routed/bebida.admin.view.routed.component';
import { BebidaAdminDeleteRoutedComponent } from './component/bebida/bebida.admin.delete.routed/bebida.admin.delete.component';

import { serverURL } from './environment/environment';

export const routes: Routes = [
  { path: '', component: SharedHomeRoutedComponent },
  { path: 'home', component: SharedHomeRoutedComponent },
  { path: 'login', component: SharedLoginRoutedComponent },
  { path: 'logout', component: SharedLogoutRoutedComponent },
  { path: 'byemail/:email', component: SharedByemailRoutedComponent },

  {
    path: 'admin/usuario/plist',
    component: UsuarioAdminPlistRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/usuario/edit/:id',
    component: UsuarioAdminEditRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/usuario/view/:id',
    component: UsuarioAdminViewRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/usuario/create',
    component: UsuarioAdminCreateRoutedComponent,
    canActivate: [AdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin/usuario/delete/:id',
    component: UsuarioAdminDeleteRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/usuario/plist/xtipousuario/:id',
    component: UsuarioXTipousuarioAdminPlistRoutedComponent,
    canActivate: [AdminGuard],
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
    path: 'admin/bebida/plist',
    component: BebidaAdminPlistRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/bebida/edit/:id',
    component: BebidaAdminEditRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/bebida/view/:id',
    component: BebidaAdminViewRoutedComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/bebida/create',
    component: BebidaAdminCreateRoutedComponent,
    canActivate: [AdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin/bebida/delete/:id',
    component: BebidaAdminDeleteRoutedComponent,
    canActivate: [AdminGuard],
  },
];
