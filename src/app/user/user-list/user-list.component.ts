import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {PageEvent} from "@angular/material/paginator";


export interface PeriodicElement {
  name: string;
  position: number;
  country: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', country: 'H'},
  {position: 2, name: 'Helium', country: 'He'},
  {position: 3, name: 'Lithium', country: 'Li'},
  {position: 4, name: 'Beryllium', country: 'Be'},
  {position: 5, name: 'Boron', country: 'B'},
  {position: 6, name: 'Carbon',  country: 'C'},
  {position: 7, name: 'Nitrogen',  country: 'N'},
  {position: 8, name: 'Oxygen',  country: 'O'},
  {position: 9, name: 'Fluorine',  country: 'F'},
  {position: 10, name: 'Neon',  country: 'Ne'},
];




@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  totalAuthor:number = 1000;
  postPerPage:number = 10;
  currentPage:number = 1;
  pageSizeOptions = [10]

  displayedColumns: string[] = ['select','action', 'position', 'name', 'country'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);

  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  check() {
    console.log(this.selection.selected)
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    console.log(this.currentPage,this.postPerPage)
  }
}
