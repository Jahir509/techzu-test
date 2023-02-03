import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Output() nameChange = new EventEmitter<string>();
  @Output() countryChange = new EventEmitter<string>();

  nameFilterChange(event: any) {
    this.nameChange.emit(event.target.value)
  }
  countryFilterChange(event: any) {
    this.countryChange.emit(event.target.value)
  }

}
