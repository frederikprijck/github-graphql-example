import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SearchResult, User } from './github.model';

@Component({
  selector: 'app-github-search-results',
  templateUrl: './github-search-results.component.html',
  styles: [
    `
    :host { display: block; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubSearchResultsComponent {
  @Input()
  result: SearchResult<User>;
}
