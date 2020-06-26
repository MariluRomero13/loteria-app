import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-winner',
  templateUrl: './dialog-winner.component.html',
  styleUrls: ['./dialog-winner.component.css']
})
export class DialogWinnerComponent implements OnInit {

  winner:string

  constructor(public dialogRef: MatDialogRef<DialogWinnerComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { this.winner = data.winner }

  ngOnInit(): void {
  }

}
