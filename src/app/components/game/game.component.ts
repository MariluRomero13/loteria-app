import { Component, OnInit } from '@angular/core';
import { ICard } from 'src/app/interfaces/card';
import { CardsService } from 'src/app/services/cards.service';
import Ws from '@adonisjs/websocket-client'
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogWinnerComponent } from '../dialog-winner/dialog-winner.component';
const ws = Ws('ws://192.168.0.13:3333', { path:'ws' })

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  cards:ICard [] = new Array(16)
  constructor(private cardService: CardsService, private authService: AuthService, private route: ActivatedRoute,
    private router: Router, private dialog: MatDialog) { 
    const data = this.authService.getDataUser()
    if (data !== null) {
      this.data = JSON.parse(data)
      this.link = this.data.link
      this.isModerator = true
    } else if (this.route.snapshot.params.link !== undefined) {
      this.link = this.route.snapshot.params.link
      this.isInvited = true
      this.isPlayAlone = false
    }
  }

  card:ICard = null
  isPlaying: boolean = false
  cardsPast: ICard[] = []
  cardsSelected = [] = []
  status = 1
  isModerator: boolean = false
  isPlayAlone: boolean = true
  isInvited: boolean = false
  data: any = null
  link: string = null
  isWinnerCentral: boolean = false
  isWinnerDiagonalLeft: boolean = false
  isWinnerDiagonalRight: boolean = false
  isWinner: boolean = false


  

  ngOnInit(): void {
  
    ws.connect()
    ws.on('open', () => {
      console.log('isOpen');
      const random = ws.subscribe('random')
      random.on('ready',() => {
        random.on('new:random', (data) => {
          if(!this.isPlaying) return;
          if (this.isPlayAlone) {
              this.card = data
              this.playSound(data.sound)
              this.cardsPast.push(data)
          } else if (data.userLink[0].links.length){
            const link = data.userLink[0].links[0].link
            if (this.link === link) {
              this.card = data
              this.playSound(data.sound)
              this.cardsPast.push(data)
            } else {
              this.router.navigate(['/main/mode'])
            }
          }
        
        })
      })

      ws.on('close', () => {
        console.log('Socket close');
        ws.leaveRoom("new:random")
      })



      const winner = ws.subscribe('winner')
      winner.on('ready', () => {
        console.log('winner open');
        winner.on('new:winner', (user) => {
          console.log(user);
          if(this.isWinner) {
            this.resetGame()
          }
          console.log(this.status + "winnerStatus");
          this.openDialogWinner(user.username)
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
    console.log('status:' + this.status);
    if (this.isCardSelected() && this.isPlaying) {
      this.cardService.getRandomCard(this.status).subscribe(res => {
        this.status = 0
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
    this.status = 1
    this.isPlaying = true
  }

  openDialogWinner (winner:string) {
    this.dialog.open(DialogWinnerComponent,
      {
        width: '450px',
        data:{ winner } 
      })
  }

  eventCard(e, i): void {
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
    /*if(this.isFirstHorizontal(this.cardsSelected) || this.isSecondHorizontal(this.cardsSelected) 
    || this.isThirdHorizontal(this.cardsSelected) || this.isLastHorizontal(this.cardsSelected) 
    || this.isFirstVertical(this.cardsSelected) || this.isSecondVertical(this.cardsSelected)
    || this.isThirdVertical(this.cardsSelected) || this.isLastVertical(this.cardsSelected)
    || this.isDiagonalRight(this.cardsSelected) || this.isDiagonalLeft(this.cardsSelected)
    || this.isCenter(this.cardsSelected)) {
      this.status = 2
      this.getRandomNumber()
      //this.resetGame()
    } else {
      alert("No le hagas al micky")
    }*/
    if (this.cardsSelected.length === 15) {
      this.isWinner = true
      this.status = 2
      this.getRandomNumber()
    } else {
      alert("No le hagas al micky")
    }

  }

  askCenterWinner (): void {
    if(this.isCenter()){
      this.isWinnerCentral = true
      this.status = 2
      this.getRandomNumber()

    } else {
      alert("No le hagas al micky")
    }
  }

  askDiagonalLeftWinner(): void {
    if(this.isDiagonalLeft()) {
      this.isWinnerDiagonalLeft = true
      this.status = 2
      this.getRandomNumber()
    } else {
      alert("No le hagas al micky")
    }
  }

  askDiagonalRightWinner(): void {
    if(this.isDiagonalRight()) {
      this.isWinnerDiagonalRight = true
      this.status = 2
      this.getRandomNumber()
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
    this.card = null
    this.cards = new Array(16)
    this.cardsPast = []
    this.cardsSelected = []
    this.status = 1
    this. isWinnerCentral= false
    this.isWinnerDiagonalLeft= false
    this.isWinnerDiagonalRight = false
    this.isWinner= false
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

  isDiagonalLeft (): boolean {
    return this.cardsSelected.includes(0) 
    && this.cardsSelected.includes(5) 
    && this.cardsSelected.includes(10) 
    && this.cardsSelected.includes(15)
  }

  isDiagonalRight (): boolean {
    return this.cardsSelected.includes(3) 
    && this.cardsSelected.includes(6) 
    && this.cardsSelected.includes(9) 
    && this.cardsSelected.includes(12)
  }

  isCenter (): boolean {
    return this.cardsSelected.includes(5) 
    && this.cardsSelected.includes(6) 
    && this.cardsSelected.includes(9) 
    && this.cardsSelected.includes(10)
  }




}
