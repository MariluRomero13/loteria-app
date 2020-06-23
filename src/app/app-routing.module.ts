import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent} from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { MainComponent } from './components/main/main.component';
import { GameboardComponent} from './components/gameboard/gameboard.component';
import { GameComponent } from './components/game/game.component';
 
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
    path: 'game',
    component: GameComponent
  },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
    { path: '', component: GameboardComponent, canActivate: [AuthGuard] }
  ]},
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
