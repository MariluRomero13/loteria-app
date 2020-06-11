import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module'
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'
import { HttpClientModule } from '@angular/common/http'
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';
import {MainComponent } from './components/main/main.component'
import { AuthGuard } from './guards/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent
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
