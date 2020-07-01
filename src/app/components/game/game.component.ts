import { Component, OnInit } from '@angular/core';
import { ICard } from 'src/app/interfaces/card';
import { CardsService } from 'src/app/services/cards.service';
import Ws from '@adonisjs/websocket-client'
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogWinnerComponent } from '../dialog-winner/dialog-winner.component';
const ws = Ws('ws://192.168.0.13:3333', { path:'ws' })
import { Winner } from 'src/app/constants/Game'

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
    console.log(this.route.snapshot.params.link);
    if (data !== null) {
      this.data = JSON.parse(data)
      this.link = this.data.link
      this.isModerator = true
    } else if (this.route.snapshot.params.link !== undefined) {
      console.log('entro');
      this.link = this.route.snapshot.params.link
      this.isInvited = true
      this.isPlayAlone = false
    }
  }

  card:ICard = null
  isPlaying: boolean = false
  cardsPast: ICard[] = []
  cardsSelected = [] = []
  isFirstTime = false
  isModerator: boolean = false
  isPlayAlone: boolean = true
  isInvited: boolean = false
  data: any = null
  link: string = null
  isWinnerCentral: boolean = false
  isWinnerLottery: boolean = false
  isWinnerDiagonalRight: boolean = false

  ngOnInit(): void {
  
    ws.connect()
    ws.on('open', () => {
      const random = ws.subscribe('random')
      random.on('ready',() => {
        random.on('new:random', (data) => {
          console.log(data);
          if (this.isPlayAlone) {
              this.card = data
              this.playSound(data.sound)
              this.cardsPast.push(data)
          } else if (data.userData[0].links.length){
            if (data.userData[0].links[0].link === this.link) {
              this.card = data
              this.playSound(data.sound)
              this.cardsPast.push(data)
            } else {
              this.router.navigate(['/main/mode'])
            }
          }
        })
      })

      const winner = ws.subscribe('winner')
      winner.on('ready', () => {
        winner.on('new:winner', (data) => {
          let mode
          switch(data.winnerMode) {
            case Winner.modeCenter:
              this.isWinnerCentral = true
              mode = "central"
            break;
            case Winner.modeLottery:
              this.isWinnerLottery = true
              mode = "loteria"
            break;
            case Winner.modeFull:
              this.resetGame()
              mode = "carta llena"
            break;
          }
          
          this.openDialogWinner({ user:data.user.username, mode })
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
    if (this.isCardSelected() && this.isPlaying) {
      this.cardService.getRandomCard(this.isFirstTime).subscribe(res => {
        this.isFirstTime = false
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
    this.isFirstTime = true
    this.isPlaying = true
  }

  openDialogWinner (data:Object) {
    this.dialog.open(DialogWinnerComponent,
      {
        width: '450px',
        data
      })
  }

  eventCard(e, i): void {
    if(this.cardsSelected.includes(i)) 
      return

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
    if (this.cardsSelected.length === 16) {
      this.sendWinnerMode(Winner.modeFull)
    } else {
      alert("No le hagas al micky")
    }
  }

  askCenterWinner (): void {
    if(this.isCenter()){
      this.sendWinnerMode(Winner.modeCenter)
    } else {
      alert("No has ganado central")
    }
  }

  askLotteryWinner (): void {
    if(this.isFirstVertical() || this.isSecondVertical() || this.isThirdVertical()
    || this.isFirstHorizontal() || this.isSecondHorizontal() || this.isThirdHorizontal()
    || this.isLastHorizontal() || this.isDiagonalLeft() || this.isDiagonalRight()){
      this.sendWinnerMode(Winner.modeLottery)
    } else {
      alert("No has ganado loteria")
    }
  }

  sendWinnerMode (mode) {
    this.cardService.sendWinnerMode(mode).subscribe(res => {
      console.log(res);
    })
  }



  resetGame() {
    this.isPlaying = false
    this.card = null
    this.cards = new Array(16)
    this.cardsPast = []
    this.cardsSelected = []
    this.isWinnerCentral= false
    this.isWinnerLottery= false
  }


  //Ways to win left to right
  isFirstVertical (): boolean {
    return this.cardsSelected.includes(0) 
    && this.cardsSelected.includes(4) 
    && this.cardsSelected.includes(8) 
    && this.cardsSelected.includes(12)
  }
  

  isSecondVertical (): boolean {
    return this.cardsSelected.includes(1) 
    && this.cardsSelected.includes(5) 
    && this.cardsSelected.includes(9) 
    && this.cardsSelected.includes(13)
  }

  isThirdVertical (): boolean {
    return this.cardsSelected.includes(2) 
    && this.cardsSelected.includes(6) 
    && this.cardsSelected.includes(10) 
    && this.cardsSelected.includes(14)
  }

  isLastVertical (): boolean {
    return this.cardsSelected.includes(3) 
    && this.cardsSelected.includes(7) 
    && this.cardsSelected.includes(11) 
    && this.cardsSelected.includes(15)
  }

  isFirstHorizontal (): boolean {
    return this.cardsSelected.includes(0) 
    && this.cardsSelected.includes(1) 
    && this.cardsSelected.includes(2) 
    && this.cardsSelected.includes(3)
  }

  isSecondHorizontal (): boolean {
    return this.cardsSelected.includes(4) 
    && this.cardsSelected.includes(5) 
    && this.cardsSelected.includes(6) 
    && this.cardsSelected.includes(7)
  }

  isThirdHorizontal (): boolean {
    return this.cardsSelected.includes(8) 
    && this.cardsSelected.includes(9) 
    && this.cardsSelected.includes(10) 
    && this.cardsSelected.includes(11)
  }

  isLastHorizontal (): boolean {
    return this.cardsSelected.includes(12) 
    && this.cardsSelected.includes(13) 
    && this.cardsSelected.includes(14) 
    && this.cardsSelected.includes(15)
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
