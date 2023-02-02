import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormGroup, FormControl, Validators} from "@angular/forms";
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
  constructor(public dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

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
      'address': new FormControl(null,Validators.required),
      'zip_code': new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
      'tel_no': new FormControl(null,[Validators.pattern(/^[0-9]+$/)]),
    })
  }
}
