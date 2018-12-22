import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styles: [
    ':host { display: block; }'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubSearchComponent {
  @Output()
  search = new EventEmitter();
}
