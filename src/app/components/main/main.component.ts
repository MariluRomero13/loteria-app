import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().subscribe( res => {
      if(res.success){
        this.authService.removeTokens()
        this.authService.removeDataUser()
        this.router.navigate([''])
      }
    }, error => {

    })
  }

}
