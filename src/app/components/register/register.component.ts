import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required,Validators.min(4)]),
      email: new FormControl('', [Validators.required,Validators.min(4),Validators.email]),
      password: new FormControl('', [Validators.required,Validators.min(4)])
    })
  }
  signin(){
    if (this.formGroup.valid){
      this.userService.signin(this.formGroup.value).subscribe(res =>{
        if(res){
          this.router.navigate(['/login']);
          console.log(res)
        }
      }, error => {
        console.log(error)
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
      }
      )}
  }

}
