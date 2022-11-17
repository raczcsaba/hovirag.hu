import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EnergetikaiComponent } from './energetikai/energetikai.component';
import { ErrorComponent } from './error/error.component';
import { KapcsolatComponent } from './kapcsolat/kapcsolat.component';
import { KlimatechnikaComponent } from './klimatechnika/klimatechnika.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';

import {MatChipsModule} from '@angular/material/chips';

import { CookieService } from 'ngx-cookie-service';
import { FooterComponent } from './footer/footer.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EnergetikaiComponent,
    ErrorComponent,
    KapcsolatComponent,
    KlimatechnikaComponent,
    NavbarComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
