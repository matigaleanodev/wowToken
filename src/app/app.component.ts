import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { Access } from './models/access.model';
import { combineLatest } from 'rxjs';
import { TableRates } from './models/currency.model';
import { TokenInfo } from './models/wow-token.model';
import { TableDataComponent } from "./components/table-data/table-data.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styles: [],
    imports: [CommonModule, TableDataComponent]
})
export class AppComponent implements OnInit {
  title = 'wowToken';

  showTable: boolean = false;
  dolarValue: TableRates = {} as TableRates;
  wowToken: TokenInfo = {} as TokenInfo;

  private service = inject(DataService);

  ngOnInit(): void {
    this.initData();
  }

  getAccess(): void {
    this.service.getAccessToken().subscribe({
      next: (res: Access) => {
        this.setToken(res);
      },
    });
  }

  getValues() {
    const dolarValue$ = this.service.getDolarValue();
    const tokenData$ = this.service.getTokenData();

    combineLatest([dolarValue$, tokenData$]).subscribe({
      next: ([dolarValue, tokenInfo]) => {
        this.dolarValue = {
          oficial: dolarValue.oficial.value_avg,
          blue: dolarValue.blue.value_avg,
          last_update: dolarValue.last_update,
        };
        this.wowToken = tokenInfo;
        this.showTable = true;
      },
      error: (error) => {
        console.error('Error en alguna de las solicitudes:', error);
      },
    });
  }

  initData() {
    const json_data = sessionStorage.getItem('DATA_ACCESS');
    if (json_data) {
      const parse_data = JSON.parse(json_data);
      this.service.token = parse_data.access_token;
      this.getValues();
    } else {
      this.getAccess();
    }
  }

  setToken(data: Access) {
    this.service.token = data.access_token;
    sessionStorage.setItem('DATA_ACCESS', JSON.stringify(data));
    this.getValues();
  }
}
