import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, count, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {
  constructor(private httpClient: HttpClient) { }

  private getCountriesRequest(url:string):Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError( err => of([]) )
    );
  }

  private apiUrl:string = 'https://restcountries.com/v3.1';

  searchCapital(term:string):Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${term}`;

    return this.getCountriesRequest(url);

  }

  searchCountry(term:string):Observable<Country[]> {

    const url = `${this.apiUrl}/name/${term}`;

    return this.getCountriesRequest(url);

  }

  searchRegion(term:string):Observable<Country[]> {

    const url = `${this.apiUrl}/region/${term}`;

    return this.getCountriesRequest(url);

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
