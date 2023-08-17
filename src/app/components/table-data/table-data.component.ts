import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRates } from 'src/app/models/currency.model';
import { TokenInfo } from 'src/app/models/wow-token.model';

@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-data.component.html',
  styles: [],
})
export class TableDataComponent implements OnInit {
  @Input({ required: true }) dolarValue!: TableRates;
  @Input({ required: true }) wowToken!: TokenInfo;


  pesoGold: number = 0;
  dolarGold: number = 0;
  tokenValue: number = 15

  ngOnInit(): void {
    this.dolarGold = this.wowToken.price / this.tokenValue;
    this.pesoGold = this.dolarGold / this.dolarValue.blue;
  }

  
}
