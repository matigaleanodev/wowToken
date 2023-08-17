import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRates } from 'src/app/models/currency.model';
import { TokenInfo } from 'src/app/models/wow-token.model';
import { NumericDirective } from 'src/app/directivas/numeric.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [CommonModule, NumericDirective, FormsModule],
  templateUrl: './calculadora.component.html',
  styles: [
  ]
})
export class CalculadoraComponent implements OnInit {
  @Input({ required: true }) dolarValue!: TableRates;
  @Input({ required: true }) wowToken!: TokenInfo;


  pesoGold: number = 0;
  dolarGold: number = 0;
  tokenValue: number = 15

  calcPeso: number = 0;
  calcGold: number = 0;

  ngOnInit(): void {
    this.dolarGold = this.wowToken.price / this.tokenValue;
    this.pesoGold = this.dolarGold / this.dolarValue.blue;
  }

  calculeGold(){
    if(this.calcPeso){
      const aux = Number(this.calcPeso) * this.pesoGold;
      this.calcGold = parseFloat((aux / 10000).toFixed(2))
    } else {
      this.calcGold = 0;
      this.calcPeso = 0;
    }
  }

  calculePeso() {
    if (this.calcGold) {
      const aux = Number(this.calcGold) * 10000;
      this.calcPeso = parseFloat((aux / this.pesoGold).toFixed(2));
    } else {
      this.calcPeso = 0;
      this.calcGold = 0;
    }
  }

  
}
