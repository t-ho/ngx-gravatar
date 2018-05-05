import { TestBed, inject } from '@angular/core/testing';
import { GravatarDefaultConfig } from './gravatar-default-config';
import * as _ from 'lodash';

import { NgxGravatarService } from './ngx-gravatar.service';

const FALLBACK_TYPES = {
  blank: 'blank',
  indenticon: 'identicon',
  mm: 'mm',
  monsterid: 'monsterid',
  retro: 'retro',
  robohash: 'robohash',
  wavatar: 'wavatar'
};

const RATING_TYPES = {
  g: 'g',
  pg: 'pg',
  r: 'r',
  x: 'x'
};

const DEFAULT_CONFIG: GravatarDefaultConfig = {
  fallback: FALLBACK_TYPES.retro,
  size: 40,
  cornerRadius: 0,
  preferGravatar: false,
  hasBorder: false,
  borderColor: '#000000',
  borderRadius: '50%',
  borderStyle: 'solid',
  borderWidth: 1,
  round: true,
  backgroundColor: 'transparent',
  rating: RATING_TYPES.g
};

const invalidFallbacks: any[] = ['', '2', 'retor', 'monsterId', 're tro', ' retro', null, true, false, 2];
const invalidRatings: any[] = ['', 'a', 'p g', ' r', null, true, false, 2];
const validRatings: string[] = ['g', 'G', 'pg', 'pG', 'Pg', 'PG', 'r', 'R', 'x', 'X'];

describe('NgxGravatarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxGravatarService]
    });
  });

  it('should be created', inject([NgxGravatarService], (service: NgxGravatarService) => {
    expect(service).toBeTruthy();
  }));
});

describe('NgxGravatarService with DEFAULT_CONFIG', () => {
  let gravatarService: NgxGravatarService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxGravatarService]
    });
    gravatarService = TestBed.get(NgxGravatarService);
    spyOn(console, 'error');
  });

  it('should be created', inject([NgxGravatarService], (service: NgxGravatarService) => {
    expect(service).toBeTruthy();
  }));

  it(`#getDefaultConfig() should return DEFAULT_CONFIG object`, () => {
    expect(gravatarService.getDefaultConfig()).toEqual(DEFAULT_CONFIG);
  });

  it(`#generateGravatarUrl('toan.hmt@gmail.com') should return url with default size, rating, fallback`, () => {
    expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com'))
      .toEqual(`//www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8` +
        `?s=${gravatarService.getDefaultConfig().size}` +
        `&r=${gravatarService.getDefaultConfig().rating}` +
        `&d=${gravatarService.getDefaultConfig().fallback}`);
  });

  it(`#generateGravatarUrl('toan.hmt@gmail.com', 150) should return url with default rating and fallback`, () => {
    expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', 150))
      .toEqual(`//www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=150` +
        `&r=${gravatarService.getDefaultConfig().rating}` +
        `&d=${gravatarService.getDefaultConfig().fallback}`);
  });

  _.forEach(validRatings, (rating) => {
    it(`#generateGravatarUrl('toan.hmt@gmail.com', 150, '${rating}') should return url with lowercase rating and default fallback`, () => {
      expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', 150, rating))
        .toEqual(`//www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=150` +
          `&r=${rating.toLowerCase()}` +
          `&d=${gravatarService.getDefaultConfig().fallback}`);
    });
  });

  _.forEach(invalidRatings, (rating) => {
    it(`#generateGravatarUrl('toan.hmt@gmail.com', 150, '${rating}') should return url with default rating and fallback`, () => {
      expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', 150, rating))
        .toEqual(`//www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=150` +
          `&r=${gravatarService.getDefaultConfig().rating}` +
          `&d=${gravatarService.getDefaultConfig().fallback}`);
    });
  });

  _.forEach(FALLBACK_TYPES, (fallback) => {
    it(`#generateGravatarUrl('toan.hmt@gmail.com', 50, 'pg', '${fallback}') should pass`, () => {
      expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', 50, 'pg', fallback))
        .toEqual(`//www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=50&r=pg` +
          `&d=${fallback}`);
    });
  });

  _.forEach(invalidFallbacks, (fallback) => {
    it(`#generateGravatarUrl('toan.hmt@gmail.com', 50, 'pg', '${fallback}') should return url with default fallback`, () => {
      expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', 50, 'pg', fallback))
        .toEqual(`//www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=50&r=pg` +
          `&d=${gravatarService.getDefaultConfig().fallback}`);
    });
  });

});
