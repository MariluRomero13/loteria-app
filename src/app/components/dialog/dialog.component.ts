import { Component, OnInit } from '@angular/core';
import { LinkService } from 'src/app/services/link.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private linkService: LinkService, private router: Router, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  }

  generateLink (): void {
    this.linkService.generateLink().subscribe(res => {
      this.dialogRef.close()
      localStorage.setItem("data", JSON.stringify(res))
      this.router.navigate(['/main/game'])
    
    })
  }

}
