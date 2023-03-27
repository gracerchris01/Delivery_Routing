import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {LandingComponent} from './components/landing/landing.component';

const routes: Routes = [
   {path:'login', component: LoginComponent},
   {path:'signup', component: SignupComponent},
   {path: 'dashboard', component: DashboardComponent},
   {path: 'homepage', component: HomepageComponent},
   {path: 'sidebar', component: SidebarComponent},
   {path: 'landing', component: LandingComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
