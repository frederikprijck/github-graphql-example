import { NgModule } from '@angular/core';
import { PaginationComponent } from './pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { NoResultsComponent } from './no-results/no-results.component';

@NgModule({
  declarations: [
    NoResultsComponent,
    PaginationComponent
  ],
  exports: [
    NoResultsComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {

}
