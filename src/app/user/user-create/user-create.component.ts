import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfig} from "@angular/cdk/dialog";
import {DialogComponent} from "../dialog/dialog.component";


export interface PeriodicElement {
  state: string;
  city: string;
  address: string;
  zipcode: string;
  telephone: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {state: 'Hydrogen', city: 'H', address: 'Address-H', zipcode: 'State-H',telephone: '01991339009'},
  {state: 'Helium', city: 'He', address: 'Address-He', zipcode: 'State-He',telephone: '01991339009'},
  {state: 'Lithium', city: 'Li', address: 'Address-Li', zipcode: 'State-Li',telephone: '01991339009'},
  {state: 'Beryllium', city: 'Be', address: 'Address-Be', zipcode: 'State-Be',telephone: '01991339009'},
  {state: 'Boron', city: 'B', address: 'Address-B', zipcode: 'State-B',telephone: '01991339009'},
  {state: 'Carbon',  city: 'C', address: 'Address-C', zipcode: 'State-C',telephone: '01991339009'},
  {state: 'Nitrogen',  city: 'N', address: 'Address-N', zipcode: 'State-N',telephone: '01991339009'},
  {state: 'Oxygen',  city: 'O', address: 'Address-O', zipcode: 'State-O',telephone: '01991339009'},
  {state: 'Fluorine',  city: 'F', address: 'Address-F', zipcode: 'State-F',telephone: '01991339009'},
  {state: 'Neon',  city: 'Ne', address: 'Address-Ne', zipcode: 'State-Ne',telephone: '01991339009'},
];


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  totalAuthor:number = 1000;
  postPerPage:number = 10;
  currentPage:number = 1;
  pageSizeOptions = [10]

  displayedColumns: string[] = ['select','state', 'city', 'address', 'zipcode','telephone'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);


  constructor(private matDialog:MatDialog) {
  }

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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }

  check() {
    console.log(this.selection.selected)
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    console.log(this.currentPage,this.postPerPage)
  }

  createRow() {

  }

  addRow() {
    this.matDialog.open(DialogComponent,{
      data:{
        isFormOpen:true
      }
    })
  }
}
