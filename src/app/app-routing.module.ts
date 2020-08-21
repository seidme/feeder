import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedsComponent } from 'src/app/feeds/feeds.component';

const routes: Routes = [
  // { path: 'feeds', component: FeedsComponent },
  // { path: '**', redirectTo: 'feeds', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
