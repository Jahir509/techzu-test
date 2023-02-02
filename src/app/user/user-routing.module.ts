import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {UserCreateComponent} from "./user-create/user-create.component";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {UserViewComponent} from "./user-view/user-view.component";
import {UserComponent} from "./user.component";

const routes: Routes = [
  {
    path:'',
    component:UserComponent,
    children:[
      {path:"",component:UserListComponent},
      {path:"create",component:UserCreateComponent},
      {path:"edit/:id",component:UserEditComponent},
      {path:"view/:id",component:UserViewComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
