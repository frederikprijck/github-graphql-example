import { TestBed, async } from '@angular/core/testing';
import { GithubService } from './github.service';
import { Apollo } from 'apollo-angular';
import { of, throwError } from 'rxjs';

describe('GithubService', () => {
  let svc: GithubService, apolloMock;

  let apolloQuery$ = of({
    data: {
      search: {
        pageInfo: {

        },
        edges: [
          {
            node: {
              foo: 'bar',
              bar: 'foo'
            }
          },
          {
            node: {
              foo: 'baz',
              bar: 'foo'
            }
          },
        ]
      }
    }
  });

  apolloMock = {
    query: () => apolloQuery$
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Apollo, useValue: apolloMock },
        GithubService
      ]
    });
  }));

  beforeEach(async(() => {
    svc = TestBed.get(GithubService);
  }));

  it('should create the app', () => {
    expect(svc).toBeTruthy();
  });

  describe('search', () => {
    it('should return mapped items based on every edge\'s node', async () => {
      const result = await svc.search('foo', {
        first: 10
      }).toPromise() as any;

      expect(result.items.length).toEqual(2);
      expect(result.items[0].foo).toEqual('bar');
      expect(result.items[1].foo).toEqual('baz');
    });

    it('should swallow errors', async () => {
      apolloQuery$ = throwError('foo');
      const result = await svc.search('foo', {
        first: 10
      }).toPromise();

      expect(result).toEqual(null);
    });
  });
});
