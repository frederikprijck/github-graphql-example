import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-github-user',
  templateUrl: './github-user.component.html',
  styles: [
    `
    :host .avatar { width: 45px; height: 45px; border-radius: .25rem; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubUserComponent {
  @Input()
  user: any;
}
