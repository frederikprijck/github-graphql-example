import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-no-results',
  templateUrl: './no-results.component.html',
  styles: [
    `
    :host { display: block; }
    :host img { max-width: 350px; width: 100%; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoResultsComponent {

}
