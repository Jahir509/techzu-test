import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {PageEvent} from "@angular/material/paginator";
import {UserService} from "../user.service";
import {UserDetail} from "../../models/user-detail.interface";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{

  isLoading:boolean = false;
  totalUser:number = 0;
  postPerPage:number = 10;
  currentPage:number = 0;
  pageSizeOptions = []
  filterName:string = '';
  filterCountry:string = '';
  displayedColumns: string[] = ['select','action', 'name', 'country'];
  dataSource = new MatTableDataSource<UserDetail>();
  selection = new SelectionModel<UserDetail>(true, []);

  constructor(private userService:UserService) {
  }

  ngOnInit() {
    this.dataSource.data = []
    this.getData();
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
  checkboxLabel(row?: UserDetail): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex;
    this.postPerPage = pageData.pageSize;
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.userService.getUsers(this.currentPage,this.postPerPage).subscribe((response)=>{
      if(response.status === 'OK' && response.data.length > 0 ){
        this.isLoading = false;
        this.dataSource.data = response.data;
        this.totalUser = response.meta.total;
        this.postPerPage = response.meta.perPage;
        this.currentPage = response.meta.page;
        this.pageSizeOptions = response.meta.postPerPage;
      }
    })
  }

  onNameChange($event: string) {
    this.isLoading = true;
    setTimeout(()=>{
      this.isLoading = false;
      this.dataSource.filter = $event.trim().toLowerCase()
    },600)
  }

  onCountryChange($event: string) {
    this.isLoading = true;
    setTimeout(()=>{
      this.isLoading = false;
      this.dataSource.filter = $event.trim().toLowerCase()
    },600)
  }
}
