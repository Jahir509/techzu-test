import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserComponent } from './user.component';
import { FilterComponent } from './filter/filter.component';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from '@angular/material/paginator';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    UserViewComponent,
    UserComponent,
    FilterComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class UserModule { }
