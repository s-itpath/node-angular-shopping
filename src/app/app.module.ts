import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { ProductComponent } from './product/product.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ObjectToArrayPipe } from './pipes/object-to-array.pipe';
import { UsersItemComponent } from './users-item/users-item.component';
import { UserProductComponent } from './user-product/user-product.component';
import { AllUserComponent } from './all-user/all-user.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table'  
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from "@angular/material/button";
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from "@angular/material/toolbar";
import {  MatSidenavModule  } from "@angular/material/sidenav";
import {  MatListModule } from "@angular/material/list";
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxPayPalModule } from 'ngx-paypal';
// import { IonicModule } from '@ionic/angular';
// import { RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { ReactiveFormsModule } from '@angular/forms';

import { ThemeModule } from './theme/theme.module';
import { lightTheme } from './theme/light-theme';
import { darkTheme } from './theme/dark-theme';

import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardUserComponent,
    ProductComponent,
    ShowProductComponent,
    CheckoutComponent,
    ObjectToArrayPipe,
    UsersItemComponent,
    UserProductComponent,
    AllUserComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    NgxPayPalModule,
    RecaptchaModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    MatSortModule,
    MatTooltipModule,
    ThemeModule.forRoot({
      themes:[lightTheme,darkTheme],
      active:'light'
    }),
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule
    // IonicModule.forRoot(AppComponent)
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue:{
        siteKey: environment.recaptcha.siteKey
      } as RecaptchaSettings
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
