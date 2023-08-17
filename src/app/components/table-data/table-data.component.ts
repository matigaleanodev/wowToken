import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TableRates } from 'src/app/models/currency.model';
import { TokenInfo } from 'src/app/models/wow-token.model';

@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './table-data.component.html',
  styles: [],
})
export class TableDataComponent implements OnInit {
  @Input({ required: true }) dolarValue!: TableRates;
  @Input({ required: true }) wowToken!: TokenInfo;

  imageSrc = "https://external-preview.redd.it/5GMy4M7EHF4sqzvzqqAjK3wZBCo1XaJtIlXcHHcRrFQ.png?width=640&crop=smart&auto=webp&s=d6135840c58bd2a0eb579987799349c9c12e5317";

  pesoGold: number = 0;
  dolarGold: number = 0;
  tokenValue: number = 15

  ngOnInit(): void {
    this.dolarGold = this.wowToken.price / this.tokenValue;
    this.pesoGold = this.dolarGold / this.dolarValue.blue;
  }

  
}
