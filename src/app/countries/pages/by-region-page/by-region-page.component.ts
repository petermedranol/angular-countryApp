import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{

  constructor( private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesService.casheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.casheStore.byRegion.region;
  }

  public isLoading: boolean = false;

  public countries: Country[] = [];

  public regions: Region[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  public selectedRegion?: Region;

  searchByRegion( region:Region ) {
    this.isLoading = true;
    this.selectedRegion = region;
    this.countriesService.searchRegion( region )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }


}
