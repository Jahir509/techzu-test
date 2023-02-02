import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfig} from "@angular/cdk/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";


export interface PeriodicElement {
  state: string;
  city: string;
  zip_code: string;
  tel_no: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // {state: 'Hydrogen', city: 'H', address: 'Address-H', zipcode: 'State-H',telephone: '01991339009'},
  // {state: 'Helium', city: 'He', address: 'Address-He', zipcode: 'State-He',telephone: '01991339009'},
  // {state: 'Lithium', city: 'Li', address: 'Address-Li', zipcode: 'State-Li',telephone: '01991339009'},
  // {state: 'Beryllium', city: 'Be', address: 'Address-Be', zipcode: 'State-Be',telephone: '01991339009'},
  // {state: 'Boron', city: 'B', address: 'Address-B', zipcode: 'State-B',telephone: '01991339009'},
  // {state: 'Carbon',  city: 'C', address: 'Address-C', zipcode: 'State-C',telephone: '01991339009'},
  // {state: 'Nitrogen',  city: 'N', address: 'Address-N', zipcode: 'State-N',telephone: '01991339009'},
  // {state: 'Oxygen',  city: 'O', address: 'Address-O', zipcode: 'State-O',telephone: '01991339009'},
  // {state: 'Fluorine',  city: 'F', address: 'Address-F', zipcode: 'State-F',telephone: '01991339009'},
  // {state: 'Neon',  city: 'Ne', address: 'Address-Ne', zipcode: 'State-Ne',telephone: '01991339009'},
];


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit{
  form!: FormGroup;
  totalAuthor:number = 1000;
  postPerPage:number = 10;
  currentPage:number = 1;
  pageSizeOptions = [10]

  displayedColumns: string[] = ['select','state', 'city', 'zipcode','telephone'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);


  constructor(private matDialog:MatDialog,private userService:UserService) {

  }

  ngOnInit() {
    this.createForm();
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

  addRow() {
    const dialogref = this.matDialog.open(DialogComponent,{
      data:{
        isFormOpen:true
      }
    })
    dialogref.afterClosed().subscribe((data)=>{
      if(data != undefined){
        this.dataSource.data = [...this.dataSource.data,data]
      }
      console.log(this.dataSource.data)
    });
  }

  deleteRow(){
    console.log(this.selection.selected)
  }

  createForm(){
    this.form = new FormGroup({
      'user_name': new FormControl(null,[Validators.required]),
      'country': new FormControl(null,[Validators.required]),
      'address_details': new FormArray([])
    })
  }

  // createAddressArray() {
  //   return new FormGroup({
  //     'state': new FormControl(null),
  //     'city': new FormControl(null),
  //     'zip_code': new FormControl(null),
  //     'tel_no': new FormControl(null)
  //   });
  // }
  createUser(){
    //this.form.controls['address_details'].setValue(this.dataSource.data)
    this.dataSource.data.forEach(item=>{
      (this.form.controls['address_details'] as FormArray).push(new FormControl(item))
    })

    console.log(this.form.value)
    this.userService.createUser(this.form.value).subscribe((response)=>{
      console.log(response)
    })
  }
}
