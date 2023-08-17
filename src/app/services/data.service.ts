import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Access } from '../models/access.model';
import { ExchangeRates } from '../models/currency.model';
import { TokenInfo } from '../models/wow-token.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _http = inject(HttpClient)

  private CLIENT_ID = environment.CLIENT_ID
  private CLIENT_SECRET = environment.CLIENT_SECRET
  private authURL = 'https://oauth.battle.net/token'
  private bnet_api = 'https://us.api.blizzard.com';
  private dolar_api = 'https://api.bluelytics.com.ar/v2/latest';
  public token = ''

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }

  getAccessToken(): Observable<Access> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`)
    });

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    return this._http.post<Access>(this.authURL, body.toString(), { headers });
  }

  getDolarValue(): Observable<ExchangeRates> {
    return this._http.get<ExchangeRates>(this.dolar_api)
  }

  getTokenData(): Observable<TokenInfo> {
    const headers = this.getHeaders();    
    const params = new HttpParams().set('namespace', 'dynamic-us');

    return this._http.get<TokenInfo>(`${this.bnet_api}/data/wow/token/index`, { headers, params })
  } 


}
