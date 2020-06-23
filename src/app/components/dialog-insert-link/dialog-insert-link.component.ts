import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-dialog-insert-link',
  templateUrl: './dialog-insert-link.component.html',
  styleUrls: ['./dialog-insert-link.component.css']
})
export class DialogInsertLinkComponent implements OnInit {

  formGroup: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      link: new FormControl('',[Validators.required])
    })
  }

}
