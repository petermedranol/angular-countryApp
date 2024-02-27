import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { count } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-conutry-page',
  templateUrl: './by-conutry-page.component.html',
  styles: ``
})
export class ByConutryPageComponent implements OnInit{

  constructor(private countriesService: CountriesService) { }

  public initialValue: string = '';

  ngOnInit(): void {
    this.countries = this.countriesService.casheStore.byCountries.countries;
    this.initialValue = this.countriesService.casheStore.byCountries.term;
  }

  public isLoading: boolean = false;

  public countries: Country[] = [];

  searchByCountry(query: string): void {
    this.isLoading = true;
    this.countriesService.searchCountry(query)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

}
