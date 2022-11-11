import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EnergetikaiComponent } from './energetikai/energetikai.component';
import { HutestechnikaComponent } from './hutestechnika/hutestechnika.component';
import { KapcsolatComponent } from './kapcsolat/kapcsolat.component';
import { KlimatechnikaComponent } from './klimatechnika/klimatechnika.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EnergetikaiComponent,
    HutestechnikaComponent,
    KapcsolatComponent,
    KlimatechnikaComponent,
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
