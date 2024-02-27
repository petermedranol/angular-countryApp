import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { count } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-conutry-page',
  templateUrl: './by-conutry-page.component.html',
  styles: ``
})
export class ByConutryPageComponent {

  constructor(private countriesService: CountriesService) { }

  public countries: Country[] = [];

  searchByCountry(query: string): void {
    this.countriesService.searchCountry(query)
      .subscribe(countries => this.countries = countries);
  }

}
