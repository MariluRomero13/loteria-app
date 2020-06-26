import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LinkService } from 'src/app/services/link.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-insert-link',
  templateUrl: './dialog-insert-link.component.html',
  styleUrls: ['./dialog-insert-link.component.css']
})
export class DialogInsertLinkComponent implements OnInit {

  formGroup: FormGroup

  constructor(private linkService: LinkService, private router: Router, 
    private dialog: MatDialogRef<DialogInsertLinkComponent>) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      link: new FormControl('',[Validators.required])
    })
  }

  checkLink (): void {
    if(this.formGroup.valid) {
      const link = this.formGroup.get('link').value
      this.linkService.checkLink(link).subscribe(res => {
        console.log(res);
        if(!res.is_active) {
          alert('El link es invalido')
        } else {
          this.router.navigate(["/main/game", link])
          this.dialog.close()
        }
      })
    } else {
      alert("Ingrese un link")
    }
  }

}
