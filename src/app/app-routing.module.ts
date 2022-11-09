import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {KlimatechnikaComponent} from "./klimatechnika/klimatechnika.component";
import {HutestechnikaComponent} from "./hutestechnika/hutestechnika.component";
import {KapcsolatComponent} from "./kapcsolat/kapcsolat.component";
import {EnergetikaiComponent} from "./energetikai/energetikai.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'energetikai', component: EnergetikaiComponent },
  { path: 'klimatechnika', component: KlimatechnikaComponent },
  { path: 'hutestechnika', component: HutestechnikaComponent },
  { path: 'kapcsolat', component: KapcsolatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
