import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'
import { HttpClientModule } from '@angular/common/http'
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';
import {MainComponent } from './components/main/main.component'
import { AuthGuard } from './guards/auth.guard';
import { GameboardComponent } from './components/gameboard/gameboard.component';

import { MaterialModule } from './shared/material/material.module';
import { ChooseGameModeComponent } from './components/choose-game-mode/choose-game-mode.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogInsertLinkComponent } from './components/dialog-insert-link/dialog-insert-link.component';
import { GameComponent } from './components/game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    GameboardComponent,
    ChooseGameModeComponent,
    DialogComponent,
    DialogInsertLinkComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule
  ], 
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
