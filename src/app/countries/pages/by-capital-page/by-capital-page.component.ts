import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  constructor(private countriesService: CountriesService) { }

  public initialValue: string = '';

  ngOnInit(): void {
    this.countries = this.countriesService.casheStore.byCapital.countries;
    this.initialValue = this.countriesService.casheStore.byCapital.term;
  }

  public countries: Country[] = [];
  public isLoading: boolean = false;

  searchByCapital(term: string):void {
    this.isLoading = true;
    this.countriesService.searchCapital(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      }
    );
  }

}
