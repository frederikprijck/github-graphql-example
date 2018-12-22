import { TestBed, async } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaginationComponent
      ]
    }).compileComponents();
  }));

  it('should emit previous when previous element was clicked', () => {
    const fixture = TestBed.createComponent(PaginationComponent);
    const component = fixture.componentInstance;
    component.pagination = {
        hasPreviousPage: true,
        startCursor: null,
        endCursor: null,
        hasNextPage: true
    };

    spyOn(component.previous, 'emit');

    const nativeElement = fixture.nativeElement;
    const previousElement = nativeElement.querySelectorAll('a')[0];
    previousElement.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.previous.emit).toHaveBeenCalled();
  });

  it('should not emit previous when previous was clicked but hasPreviousPage is false', () => {
    const fixture = TestBed.createComponent(PaginationComponent);
    const component = fixture.componentInstance;
    component.pagination = {
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
        hasNextPage: true
    };

    spyOn(component.previous, 'emit');

    const nativeElement = fixture.nativeElement;
    const previousElement = nativeElement.querySelectorAll('a')[0];
    previousElement.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.previous.emit).not.toHaveBeenCalled();
  });

  it('should emit next when next was clicked', () => {
    const fixture = TestBed.createComponent(PaginationComponent);
    const component = fixture.componentInstance;
    component.pagination = {
        hasPreviousPage: true,
        startCursor: null,
        endCursor: null,
        hasNextPage: true
    };

    spyOn(component.next, 'emit');

    const nativeElement = fixture.nativeElement;
    const nextElement = nativeElement.querySelectorAll('a')[1];
    nextElement.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.next.emit).toHaveBeenCalled();
  });

  it('should not emit next when next was clicked but hasNextPage is false', () => {
    const fixture = TestBed.createComponent(PaginationComponent);
    const component = fixture.componentInstance;
    component.pagination = {
        hasPreviousPage: true,
        startCursor: null,
        endCursor: null,
        hasNextPage: false
    };

    spyOn(component.next, 'emit');

    const nativeElement = fixture.nativeElement;
    const nextElement = nativeElement.querySelectorAll('a')[1];
    nextElement.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.next.emit).not.toHaveBeenCalled();
  });
});
