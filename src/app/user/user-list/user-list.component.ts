import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {PageEvent} from "@angular/material/paginator";
import {UserService} from "../user.service";


export interface User {
  user_name: string;
  country: string;
  created_at: Date;
  update_at: Date;
  user_id: string;
}

const ELEMENT_DATA: User[] = [

];




@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{

  totalUser:number = 1000;
  postPerPage:number = 10;
  currentPage:number = 1;
  pageSizeOptions = []

  displayedColumns: string[] = ['select','action', 'name', 'country'];
  dataSource = new MatTableDataSource<User>();
  selection = new SelectionModel<User>(true, []);

  constructor(private userService:UserService) {
  }

  ngOnInit() {
    this.dataSource.data = []
    this.userService.getUsers().subscribe((response)=>{
      if(response.status === 'OK' && response.data.length > 0 ){
        this.dataSource.data = response.data;
        this.totalUser = response.meta.total;
        this.postPerPage = response.meta.perPage;
        this.currentPage = response.meta.page;
        this.pageSizeOptions = response.meta.postPerPage;
      }
    })
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
  checkboxLabel(row?: User): string {
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
}
