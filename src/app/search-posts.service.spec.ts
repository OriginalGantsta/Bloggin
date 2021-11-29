import { TestBed } from '@angular/core/testing';

import { SearchPostsService } from './search-posts.service';

describe('SearchPostsService', () => {
  let service: SearchPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
