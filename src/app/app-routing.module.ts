import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent} from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard'
import { MainComponent } from './components/main/main.component'
 
const routes: Routes = [
  {
    path: "login", 
    component: LoginComponent
  },
  {
    path: "register", 
    component: RegisterComponent
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
