import { Routes } from '@angular/router';

import { SharedLoginRoutedComponent } from './component/shared/shared.login.routed/shared.login.routed';
import { SharedLogoutRoutedComponent } from     './component/shared/shared.logout.routed/shared.logout.routed';
import { SharedByemailRoutedComponent } from './component/shared/shared.byemail.routed/shared.byemail.routed.component';
import { SharedHomeRoutedComponent } from './component/shared/shared.home.routed/shared.home.routed.component';

export const routes: Routes = [

    { path: '', component: SharedHomeRoutedComponent},
    { path: 'home', component: SharedHomeRoutedComponent },
    { path: 'login', component: SharedLoginRoutedComponent },
    { path: 'logout', component: SharedLogoutRoutedComponent },
    { path: 'byemail/:email', component: SharedByemailRoutedComponent},




];
