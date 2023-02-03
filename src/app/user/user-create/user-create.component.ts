import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {UserAddress} from "../../models/user-address.interfce";



@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit{

  form!: FormGroup;
  displayedColumns: string[] = ['select','action','state', 'city', 'zipcode','telephone'];
  dataSource = new MatTableDataSource<UserAddress>();
  selection = new SelectionModel<UserAddress>(true, []);


  constructor(private matDialog:MatDialog,
              private userService:UserService,
              private router:Router) {
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
  checkboxLabel(row?: UserAddress): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
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
    });
  }

  deleteRow(){
    this.dataSource.data = this.dataSource.data.filter(x=> !this.selection.selected.find(y=> y.state === x.state))
  }

  createForm(){
    this.form = new FormGroup({
      'user_name': new FormControl(null,[Validators.required]),
      'country': new FormControl(null,[Validators.required]),
      'address_details': new FormArray([])
    })
  }

  createUser(){
    this.dataSource.data.forEach(item=>{
      (this.form.controls['address_details'] as FormArray).push(new FormControl(item))
    })

    this.userService.createUser(this.form.value).subscribe((response)=>{
      if(response.status === 'OK'){
        const dialogRef = this.matDialog.open(DialogComponent,{
          data:{
            submitSuccess:true,
            message:"User created successfully"
          }
        })
        dialogRef.afterOpened().subscribe(()=>{
          setTimeout(()=>{
            dialogRef.close();
            this.router.navigateByUrl("/userlist");
          },3000)
        })
      }
    })
  }

  editAddress(element:any) {
    const dialogref = this.matDialog.open(DialogComponent,{
      data:{
        isFormOpen:true,
        setForUpdate:element
      }
    })
    dialogref.afterClosed().subscribe((data)=>{
      if(data != undefined){
        this.deleteRow()
        this.dataSource.data = [...this.dataSource.data,data]
      }
    });
  }
}
