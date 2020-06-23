import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm () {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login(){
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(res => {
        if (res.hasOwnProperty('token')) {
          this.authService.saveTokens(res)
          this.router.navigate(['/main/mode'])
        } 
      }, error => {
        switch(error.status) {
          case 401:
            alert("Por favor verifica tus credenciales")
            break;
          case 500:
            alert("Error en el servidor")
            break;
          case 503:
          case 502:
               alert('Error de conexión')
          break;
          default:
            alert("Ocurrió un error")
        }
      })
    }
  }


}
