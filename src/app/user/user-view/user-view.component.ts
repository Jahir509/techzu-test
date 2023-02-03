import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {PageEvent} from "@angular/material/paginator";
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";

export interface PeriodicElement {
  state: string;
  city: string;
  zip_code: string;
  tel_no: string;
  _id:string
}

export interface UserDetail{
  user_id?:string;
  user_name:string;
  country:string;
  created_at:Date;
  updated_at:Date;
  address_details:[];
}

const ELEMENT_DATA: PeriodicElement[] = [

];

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit{
  user:UserDetail | undefined;

  displayedColumns: string[] = ['select','state', 'city', 'zipcode','telephone'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(private userService:UserService,private activeRoute:ActivatedRoute) {
  }

  ngOnInit() {
    this.dataSource.data = []
    let id = this.activeRoute.snapshot.paramMap.get('id')!;
    this.userService.getUserById(id).subscribe((response)=>{
      if(response.status === 'OK' ){
        this.user = response.data
        this.dataSource.data = response.data.address_details
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }

  check() {
    console.log(this.selection.selected)
  }
}
