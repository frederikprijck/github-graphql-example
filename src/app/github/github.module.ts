import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubSearchComponent } from './github-search.component';
import { GithubService } from './github.service';
import { GithubSearchResultsComponent } from './github-search-results.component';
import { GithubComponent } from './github.component';
import { SharedModule } from '../shared/shared.module';
import { GithubUserComponent } from './github-user.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    GithubSearchComponent,
    GithubSearchResultsComponent,
    GithubUserComponent,
    GithubComponent
  ],
  exports: [
    GithubComponent
  ],
  imports: [
    CommonModule,
    NgbTooltipModule,
    SharedModule
  ],
  providers: [
    GithubService
  ]
})
export class GithubModule {}
