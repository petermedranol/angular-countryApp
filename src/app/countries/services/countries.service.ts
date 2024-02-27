import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, count, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  public casheStore:CacheStore = {
    byCapital:   { term:   '', countries: [] },
    byCountries: { term:   '', countries: [] },
    byRegion:    { region: '', countries: [] },
  }

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
   }

  private saveToLocalStorage():void {
    localStorage.setItem('cacheStore', JSON.stringify(this.casheStore));
  }

  private loadFromLocalStorage():any {
    if(!localStorage.getItem('cacheStore')) return;
    this.casheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }


  private getCountriesRequest(url:string):Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError( err => of([]) )
    );
  }

  private apiUrl:string = 'https://restcountries.com/v3.1';

  searchCapital(term:string):Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${term}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.casheStore.byCapital = { term, countries }),
        tap( () => this.saveToLocalStorage() ),
      );

  }

  searchCountry(term:string):Observable<Country[]> {

    const url = `${this.apiUrl}/name/${term}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.casheStore.byCountries = { term, countries }),
        tap( () => this.saveToLocalStorage() ),
      );

  }

  searchRegion(term:Region):Observable<Country[]> {

    const url = `${this.apiUrl}/region/${term}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.casheStore.byRegion = { region: term, countries }),
        tap( () => this.saveToLocalStorage() ),
      );

  }

  getCountryByAlpha(id:string):Observable<Country | null> {

    const url = `${this.apiUrl}/alpha/${id}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        map( ([country]) => country ),
        catchError( err => of(null) )
      );

  }


}
