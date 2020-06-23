import { Component, OnInit } from '@angular/core';
import { ICard } from 'src/app/interfaces/card';
import { CardsService } from 'src/app/services/cards.service';
import Ws from '@adonisjs/websocket-client'
const ws = Ws('ws://192.168.0.13:3333', { path:'ws' })

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  cards:ICard [] = new Array(16)
  constructor(private cardService: CardsService) { }

  card:ICard 
  isPlaying: boolean = false
  cardsPast: ICard[] = []
  cardsSelected = [] = []
  status = 1
  

  ngOnInit(): void {
    ws.connect()
    ws.on('open', () => {
      console.log('isOpen');
      const random = ws.subscribe('random')
      random.on('ready',() => {
        random.on('new:random', (data) => {
          console.log({data});
          this.playSound(data.sound)
          this.cardsPast.push(data)
          console.log(this.cardsPast);
        })
      })
    })
  }

  generateCard (): void {
    this.cardService.generateCard().subscribe(res => {
      this.cards = res
    })
  }

  getRandomNumber(): void {
    console.log(this.status);
    if (this.isCardSelected() && this.isPlaying) {
      this.cardService.getRandomCard(this.status).subscribe(res => {
        this.card = res
      })
    } else {
      alert("Escoja una carta")
    }
    
  }

  play(): void {
    if(!this.isCardSelected()){
      alert('Escoje una carta') 
      return
    }
    this.isPlaying = true
  }

  eventCard(e, i): void {
    console.log(i);
    console.log(e.target.dataset.card);

    if (this.cardsPast.length) {
      const numberOfCard = e.target.dataset.card
      const found = this.cardsPast.find(item => {
        return item.cardNumber == numberOfCard
      })

      if (found !== undefined) {
        e.target.parentNode.childNodes[2].classList.remove("cardNotFound")
        this.cardsSelected.push(i)
      }

    }
    
  }

  isCardSelected ():boolean {
    return this.cards[0] instanceof Object
  }

  playSound (path: string) : void {
    const audio = new Audio(path)
    audio.play()
  }

  askWinner (): void {
    if(this.isFirstHorizontal(this.cardsSelected) || this.isSecondHorizontal(this.cardsSelected) 
    || this.isThirdHorizontal(this.cardsSelected) || this.isLastHorizontal(this.cardsSelected) 
    || this.isFirstVertical(this.cardsSelected) || this.isSecondVertical(this.cardsSelected)
    || this.isThirdVertical(this.cardsSelected) || this.isLastVertical(this.cardsSelected)
    || this.isDiagonalRight(this.cardsSelected) || this.isDiagonalLeft(this.cardsSelected)
    || this.isCenter(this.cardsSelected)) {
      alert('winner')
      this.resetGame()
    } else {
      alert("No le hagas al micky")
    }
  }

  //Ways to win left to right
  isFirstVertical (array): boolean {
    return array.includes(0) 
    && array.includes(4) 
    && array.includes(8) 
    && array.includes(12)
  }

  resetGame() {
    this.isPlaying = false
    this.cards = new Array(16)
    this.cardsPast = []
    this.cardsSelected = []
    this.status = 1
  }

  isSecondVertical (array): boolean {
    return array.includes(1) 
    && array.includes(5) 
    && array.includes(9) 
    && array.includes(13)
  }

  isThirdVertical (array): boolean {
    return array.includes(2) 
    && array.includes(6) 
    && array.includes(10) 
    && array.includes(14)
  }

  isLastVertical (array): boolean {
    return array.includes(3) 
    && array.includes(7) 
    && array.includes(11) 
    && array.includes(15)
  }

  isFirstHorizontal (array): boolean {
    return array.includes(0) 
    && array.includes(1) 
    && array.includes(2) 
    && array.includes(3)
  }

  isSecondHorizontal (array): boolean {
    return array.includes(4) 
    && array.includes(5) 
    && array.includes(6) 
    && array.includes(7)
  }

  isThirdHorizontal (array): boolean {
    return array.includes(8) 
    && array.includes(9) 
    && array.includes(10) 
    && array.includes(11)
  }

  isLastHorizontal (array): boolean {
    return array.includes(12) 
    && array.includes(13) 
    && array.includes(14) 
    && array.includes(15)
  }

  isDiagonalRight (array): boolean {
    return array.includes(0) 
    && array.includes(5) 
    && array.includes(10) 
    && array.includes(15)
  }

  isDiagonalLeft (array): boolean {
    return array.includes(3) 
    && array.includes(6) 
    && array.includes(9) 
    && array.includes(11)
  }

  isCenter (array): boolean {
    return array.includes(6) 
    && array.includes(7) 
    && array.includes(10) 
    && array.includes(11)
  }




}
