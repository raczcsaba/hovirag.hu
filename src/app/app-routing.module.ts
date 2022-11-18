import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {KlimatechnikaComponent} from "./klimatechnika/klimatechnika.component";
import {ErrorComponent} from "./error/error.component";
import {KapcsolatComponent} from "./kapcsolat/kapcsolat.component";
import {EnergetikaiComponent} from "./energetikai/energetikai.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'energetikai', component: EnergetikaiComponent },
  { path: 'munkak', component: KlimatechnikaComponent, data:{ info : "munkak" } },
  { path: 'kapcsolat', component: KapcsolatComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
