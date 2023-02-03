import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UserService} from "../user.service";
export interface PeriodicElement {
  state?: string;
  city?: string;
  address?: string;
  zip_code?: number;
  tel_no?: string;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  form!: FormGroup;
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService:UserService
              ) { }

  ngOnInit(): void {
    this.createForm();
  }

  grabData(){
    const addressData:PeriodicElement = {
      state:this.form.value.state,
      city:this.form.value.city,
      address:this.form.value.address,
      zip_code:+this.form.value.zip_code,
      tel_no:this.form.value.tel_no,
    }

    this.dialogRef.close(addressData)
  }

  close() {
    this.dialogRef.close("Thanks for using me!");
  }

  private createForm() {
    this.form = new FormGroup({
      'state': new FormControl(null,Validators.required),
      'city': new FormControl(null,Validators.required),
      'address': new FormControl(null),
      'zip_code': new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
      'tel_no': new FormControl(null,[Validators.pattern(/^[0-9]+$/)]),
    })
    if(this.data.setForUpdate){
      this.organizeData(this.data.setForUpdate);
    }
  }

  submitData() {
    this.userService.updateUser(this.data.formData).subscribe((response)=>{
      if(response.status === 'OK'){
        this.dialogRef.close(response.data)
      }
    },error => {
      let response = {
        status:'FAIL',
        err: error
      }
      this.dialogRef.close(response)
    })
  }

  organizeData(dataForUpdate:PeriodicElement) {
    this.form.controls['state'].setValue(dataForUpdate.state)
    this.form.controls['city'].setValue(dataForUpdate.city)
    this.form.controls['address'].setValue(dataForUpdate.address)
    this.form.controls['zip_code'].setValue(dataForUpdate.zip_code)
    this.form.controls['tel_no'].setValue(dataForUpdate.tel_no)
  }
}
