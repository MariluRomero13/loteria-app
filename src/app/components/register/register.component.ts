import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserService} from 'src/app/services/user.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  signin(){
    console.log(this.formGroup.value)
    if (this.formGroup.valid){
      this.userService.signin(this.formGroup.value).subscribe(res =>{
        if(res){
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
