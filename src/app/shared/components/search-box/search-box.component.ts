import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>();

  @Input() placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();
  private debouncerSubscription?: Subscription;

  @Input() initialValue: string = '';


  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe(value => {
      this.emitValue(value);
    });
  }

  onDoubleClick( txtInput: any): void {
    txtInput.value = '';
    this.emitValue('');
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  emitValue(value:string):void {
    this.onValue.emit(value);
  }

  onKeyPresss(searchTerm: string):void {
    this.debouncer.next(searchTerm);
  }


}
