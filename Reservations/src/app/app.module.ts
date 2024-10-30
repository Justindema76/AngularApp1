//app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StoreModule } from "./store/store.module";
import { FormsModule } from '@angular/forms';
import { StoreComponent } from "./store/store.component";
import { CheckoutComponent } from "./store/checkout.component";
import { CartDetailComponent } from "./store/cartDetail.component";
import { RouterModule } from "@angular/router";
import { StoreFirstGuard } from "./storeFirst.guard";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule,ReactiveFormsModule, StoreModule,
    RouterModule.forRoot([
        {
            path: "store", component: StoreComponent,
            canActivate: [StoreFirstGuard]
        },
        {
            path: "cart", component: CartDetailComponent,
            canActivate: [StoreFirstGuard]
        },
        {
            path: "checkout", component: CheckoutComponent,
            canActivate: [StoreFirstGuard]
        },
        {
            path: "admin",
            loadChildren: () => import("./admin/admin.module")
                .then(m => m.AdminModule),
            canActivate: [StoreFirstGuard]
        },
        { path: "**", redirectTo: "/store" }
    ]),
    BrowserAnimationsModule],
  providers: [StoreFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
