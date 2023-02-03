import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserAddress} from "../../models/user-address.interfce";
import { UserDetail } from 'src/app/models/user-detail.interface';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit{
  form!: FormGroup;
  user!:UserDetail;

  displayedColumns: string[] = ['select','action','state', 'city', 'zipcode','telephone'];
  dataSource = new MatTableDataSource<UserAddress>();
  selection = new SelectionModel<UserAddress>(true, []);

  constructor(private matDialog:MatDialog,
              private userService:UserService,
              private activeRoute:ActivatedRoute,
              private router:Router) {
  }

  ngOnInit() {
    this.createForm();
    this.dataSource.data = []
    let id = this.activeRoute.snapshot.paramMap.get('id')!;
    this.userService.getUserById(id).subscribe((response)=>{
      if(response.status === 'OK' ){
        this.organizeData(response.data)
      }
    })
  }

  organizeData(response: any) {
    this.form.controls['user_id'].setValue(this.activeRoute.snapshot.paramMap.get('id')!)
    this.form.controls['user_name'].setValue(response.user_name)
    this.form.controls['country'].setValue(response.country)
    this.dataSource.data = response.address_details;
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

  update() {
    if(this.dataSource.data.length < 1){
      (this.form.controls['address_details'] as FormArray).clear()
    }
    else{
      this.dataSource.data.forEach(item=>{
        (this.form.controls['address_details'] as FormArray).push(new FormControl(item))
      })
    }
    const dialogref = this.matDialog.open(DialogComponent,{
      data:{
        isUpdateButtonClicked:true,
        formData: this.form.value
      }
    })

    dialogref.afterClosed().subscribe((data)=>{
      if(data != null){
        const dialogref = this.matDialog.open(DialogComponent,{
          data:{
            submitSuccess:true,
            message:"User updated successfully"
          }
        })
        dialogref.afterOpened().subscribe(()=>{
          setTimeout(()=>{
            this.form.reset();
            dialogref.close();
            this.router.navigateByUrl("/userlist")
          },3000)
        })
      }
    })
  }

    createForm(){
      this.form = new FormGroup({
        'user_id': new FormControl(null),
        'user_name': new FormControl(null,[Validators.required]),
        'country': new FormControl(null,[Validators.required]),
        'address_details': new FormArray([])
      })
  }

  updateUser() {

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
