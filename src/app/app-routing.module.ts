import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './guard/authguard.guard';
import { AdminguardGuard } from './guard/adminguard.guard';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ProductComponent } from './product/product.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UsersItemComponent } from './users-item/users-item.component';
import { UserProductComponent } from './user-product/user-product.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent, canActivate:[AuthguardGuard]},
  {path:'user',component:BoardUserComponent, canActivate:[AuthguardGuard]},
  {path:'admin',component:BoardAdminComponent, canActivate:[AuthguardGuard]},
  {path:'product',component:ProductComponent, canActivate:[AdminguardGuard]},
  {path:'showproduct',component:ShowProductComponent, canActivate:[AuthguardGuard]},
  {path:'checkout', component:CheckoutComponent, canActivate:[AuthguardGuard]},
  {path:'showitem', component:UsersItemComponent, canActivate:[AuthguardGuard]},
  {path:'userpro',component:UserProductComponent, canActivate:[AuthguardGuard]},
  {path:'',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
