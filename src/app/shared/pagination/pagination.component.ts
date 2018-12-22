import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input()
  pagination: {
    hasPreviousPage: boolean,
    hasNextPage: boolean,
    startCursor: string,
    endCursor: string,
  };
  @Output()
  previous = new EventEmitter();
  @Output()
  next = new EventEmitter();

  onPrevious(event) {
    event.preventDefault();
    if (this.pagination && this.pagination.hasPreviousPage) {
      this.previous.emit(this.pagination);
    }
  }

  onNext(event) {
    event.preventDefault();
    if (this.pagination && this.pagination.hasNextPage) {
      this.next.emit(this.pagination);
    }
  }
}
