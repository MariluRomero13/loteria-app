import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogInsertLinkComponent } from '../dialog-insert-link/dialog-insert-link.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-game-mode',
  templateUrl: './choose-game-mode.component.html',
  styleUrls: ['./choose-game-mode.component.css']
})
export class ChooseGameModeComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router) { }

  style: object = { width: '450px' }

  ngOnInit(): void {
  }

  openDialog (): void {
    this.dialog.open(DialogComponent,this.style)
  }

  openDialogInsertLink () : void {
    this.dialog.open(DialogInsertLinkComponent,this.style)
  }

  playAlone () {
    localStorage.removeItem('data')
    this.router.navigate(['/main/game'])
  }

}
