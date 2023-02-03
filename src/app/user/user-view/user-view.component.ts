import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";
import {UserAddress} from "../../models/user-address.interfce";
import {UserDetail} from "../../models/user-detail.interface";


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit{
  user:UserDetail = {
    user_id: '',
    user_name: '',
    country: '',
    created_at: new Date(),
    updated_at:new Date(),
    address_details:[]
  }
  displayedColumns: string[] = ['select','state', 'city', 'zipcode','telephone'];
  dataSource = new MatTableDataSource<UserAddress>();
  selection = new SelectionModel<UserAddress>(true, []);

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
  checkboxLabel(row?: UserAddress): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }

}
