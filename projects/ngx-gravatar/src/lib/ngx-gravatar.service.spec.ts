import { TestBed, inject } from '@angular/core/testing';
import { GravatarConfig } from './gravatar-config';
import forEach from 'lodash-es/forEach';

import { GravatarModule } from './gravatar.module';
import { NgxGravatarService } from './ngx-gravatar.service';
import { not } from '@angular/compiler/src/output/output_ast';
import { DEFAULT_CONFIG } from './ngx-gravatar.constants';
import { FALLBACK, RATING } from './ngx-gravatar.enums';

const notStrings: any[] = [null, true, false, 2];
const invalidFallbacks: any[] = ['', '2', 'retor', 'monsterId', 're tro', ' retro', null, true, false, 2]; // undefined
const validFallbacks: string[] = ['blank', 'identicon', 'mm', 'monsterid', 'retro', 'robohash', 'wavatar'];
const invalidRatings: any[] = ['', 'a', 'G', 'pG', 'Pg', 'PG', 'p g', 'R', ' r', 'X', null, true, false, 2]; // undefined handled separately
const validRatings: string[] = ['g', 'pg', 'r', 'x'];

const invalidCustomConfigs: any[] = generateInvalidCustomConfig();
const validCustomConfigs: any[] = generateValidCustomConfig();

function generateValidCustomConfig(): any[] {
  const configs: any[] = [];
  configs.push({
    in: DEFAULT_CONFIG,
    out: DEFAULT_CONFIG,
  });
  forEach(validFallbacks, (fallback => {
    configs.push({
      in: { fallback: fallback },
      out: { fallback: fallback },
      consoleErrorMessage: generateFallbackErrorMessage(fallback, DEFAULT_CONFIG.fallback)
    });
  }));
  forEach(validRatings, (rating => {
    configs.push({
      in: { rating: rating },
      out: { rating: rating.toLowerCase() },
      consoleErrorMessage: generateRatingErrorMessage(rating, DEFAULT_CONFIG.rating)
    });
  }));
  return configs;
}

function generateInvalidCustomConfig(): any[] {
  const configs: any[] = [];
  forEach(invalidFallbacks, fallback => {
    configs.push({
      in: { fallback: fallback },
      out: { fallback: DEFAULT_CONFIG.fallback },
      consoleErrorMessage: generateFallbackErrorMessage(fallback, DEFAULT_CONFIG.fallback)
    });
  });
  forEach(invalidRatings, (rating => {
    configs.push({
      in: { rating: rating },
      out: { rating: DEFAULT_CONFIG.rating },
      consoleErrorMessage: generateRatingErrorMessage(rating, DEFAULT_CONFIG.rating)
    });
  }));
  return configs;
}

function generateFallbackErrorMessage(fallback, defaultFallback) {
  return `[ngx-gravatar] - "${fallback}" is invalid gravatar fallback type. `
    + `Default fallback "${defaultFallback}" is used.`;
}

function generateRatingErrorMessage(rating, defaultRating) {
  return `[ngx-gravatar] - "${rating}" is invalid gravatar rating type. ` +
    `Default rating "${defaultRating}" is used.`;
}

function generateEmailErrorMessage(notStringEmail) {
  return `[ngx-gravatar] - Email (${notStringEmail}) is not a string. Empty string is used as a default email.`;
}

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
      .toEqual(`//www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8`
        + `?s=${gravatarService.getDefaultConfig().size}`
        + `&r=${gravatarService.getDefaultConfig().rating}`
        + `&d=${gravatarService.getDefaultConfig().fallback}`);
  });

  forEach(notStrings, (notString) => {
    it(`#generateGravatarUrl(${notString}) should return url with default hash, size, rating, fallback and PRINT error message`, () => {
      expect(gravatarService.generateGravatarUrl(notString))
        .toEqual(`//www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e`
          + `?s=${gravatarService.getDefaultConfig().size}`
          + `&r=${gravatarService.getDefaultConfig().rating}`
          + `&d=${gravatarService.getDefaultConfig().fallback}`);
      expect(console.error).toHaveBeenCalledWith(generateEmailErrorMessage(notString));
    });
  });

  it(`#generateGravatarUrl('toan.hmt@gmail.com', 150) should return url with default rating, fallback and NOT PRINT error message`, () => {
    expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', 150))
      .toEqual(`//www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=150`
        + `&r=${gravatarService.getDefaultConfig().rating}`
        + `&d=${gravatarService.getDefaultConfig().fallback}`);
    expect(console.error).not.toHaveBeenCalledWith(generateEmailErrorMessage('toan.hmt@gmail.com'));
  });

  forEach(validRatings, (rating) => {
    const stmt = `#generateGravatarUrl('toan.hmt@gmail.com', 150, '${rating}') `
      + `should return url with lowercase rating, default fallback and NOT PRINT error message`;
    it(stmt, () => {
      expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', 150, rating))
        .toEqual(`//www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=150`
          + `&r=${rating.toLowerCase()}`
          + `&d=${gravatarService.getDefaultConfig().fallback}`);
      expect(console.error).not.toHaveBeenCalledWith(generateRatingErrorMessage(rating, gravatarService.getDefaultConfig().rating));
    });
  });

  it(`#generateGravatarUrl('toan.hmt@gmail.com', 380, undefined) `
      + `should return url with default rating, fallback and NOT PRINT error message`, () => {
    expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', 380, undefined))
      .toEqual(`//www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=380`
        + `&r=${gravatarService.getDefaultConfig().rating}`
        + `&d=${gravatarService.getDefaultConfig().fallback}`);
    expect(console.error).not.toHaveBeenCalledWith(generateRatingErrorMessage(undefined, gravatarService.getDefaultConfig().rating));
  });

  forEach(invalidRatings, (rating) => {
    const statment = `#generateGravatarUrl('toan.hmt@gmail.com', 150, '${rating}') `
      + `should return url with default rating, fallback and PRINT error message`;
    it(statment, () => {
      expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', 150, rating))
        .toEqual(`//www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=150`
          + `&r=${gravatarService.getDefaultConfig().rating}`
          + `&d=${gravatarService.getDefaultConfig().fallback}`);
      expect(console.error).toHaveBeenCalledWith(generateRatingErrorMessage(rating, gravatarService.getDefaultConfig().rating));
    });
  });

  forEach(validFallbacks, (fallback) => {
    const statment = `#generateGravatarUrl('toan.hmt@gmail.com', 50, 'pg', '${fallback}') `
      + `should return specified parameters and NOT PRINT error message`;
    it(statment, () => {
      expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', 50, 'pg', fallback))
        .toEqual(`//www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=50&r=pg&d=${fallback}`);
      expect(console.error).not.toHaveBeenCalledWith(generateFallbackErrorMessage(fallback, gravatarService.getDefaultConfig().fallback));
    });
  });

  it(`#generateGravatarUrl('toan.hmt@gmail.com', 380, 'pg', undefined) `
      + `should return url with default fallback and NOT PRINT error message`, () => {
    expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', 380, 'pg', undefined))
      .toEqual(`//www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=380&r=pg`
        + `&d=${gravatarService.getDefaultConfig().fallback}`);
    expect(console.error).not.toHaveBeenCalledWith(generateFallbackErrorMessage(undefined, gravatarService.getDefaultConfig().fallback));
  });

  forEach(invalidFallbacks, (fallback) => {
    const statment = `#generateGravatarUrl('toan.hmt@gmail.com', 50, 'pg', '${fallback}') `
      + `should return url with default fallback and PRINT error message`;
    it(statment, () => {
      expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', 50, 'pg', fallback))
        .toEqual(`//www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=50&r=pg`
          + `&d=${gravatarService.getDefaultConfig().fallback}`);
      expect(console.error).toHaveBeenCalledWith(generateFallbackErrorMessage(fallback, gravatarService.getDefaultConfig().fallback));
    });
  });

});

describe('NgxGravatarService with custom configuration', () => {
  function setup(gravatarConfig: GravatarConfig) {
    TestBed.configureTestingModule({
      imports: [GravatarModule.forRoot(gravatarConfig)],
      providers: [NgxGravatarService]
    });
    spyOn(console, 'error');
    return TestBed.get(NgxGravatarService);
  }

  forEach(validCustomConfigs, config => {
    const stmt = `With forRoot(${JSON.stringify(config.in)}), `
      + `#getDefaultConfig should return an object contains ${JSON.stringify(config.out)} `
      + `and NOT print error message`;
    it(stmt, () => {
      const gravatarService = setup(config.in);
      expect(gravatarService.getDefaultConfig())
        .toEqual(jasmine.objectContaining(config.out));
      expect(console.error).not.toHaveBeenCalledWith(config.consoleErrorMessage);
    });
  });

  forEach(invalidCustomConfigs, config => {
    const stmt = `With forRoot(${JSON.stringify(config.in)}), `
      + `#getDefaultConfig should return an object contains ${JSON.stringify(config.out)} `
      + `and print error message`;
    it(stmt, async () => {
      const gravatarService = await setup(config.in);
      expect(gravatarService.getDefaultConfig())
        .toEqual(jasmine.objectContaining(config.out));
      expect(console.error).toHaveBeenCalledWith(config.consoleErrorMessage);
    });
  });
});
