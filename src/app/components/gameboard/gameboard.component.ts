import { Component, OnInit } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';
import { ICard } from 'src/app/interfaces/card';
@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  cardsArray: ICard[]=[];
  constructor(private cardsservice: CardsService) { }

  ngOnInit(): void {
    this.generateCard()
  }

  generateCard(){
    this.cardsservice.generateCard().subscribe(res=>{
      this.cardsArray=res;
      console.log(this.cardsArray)
    })
  }

}
