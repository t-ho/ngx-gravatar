import { TestBed, inject } from '@angular/core/testing';
import { GravatarConfig } from './gravatar-config';

import { GravatarModule } from './gravatar.module';
import { NgxGravatarService } from './ngx-gravatar.service';
import { not } from '@angular/compiler/src/output/output_ast';
import { DEFAULT_CONFIG } from './ngx-gravatar.constants';
import { FALLBACK, RATING } from './ngx-gravatar.enums';

const notStrings: any[] = [null, true, false, 2, undefined];
const validFallbacks: string[] = ['blank', 'identicon', 'mm', 'mp', 'monsterid', 'retro', 'robohash', 'wavatar'];
const validRatings: string[] = ['g', 'pg', 'r', 'x'];

const validCustomConfigs: any[] = generateValidCustomConfig();

function generateValidCustomConfig(): any[] {
  const configs: any[] = [];
  configs.push({
    in: DEFAULT_CONFIG,
    out: DEFAULT_CONFIG
  });
  validFallbacks.forEach(fallback => {
    configs.push({
      in: { fallback },
      out: { fallback },
      consoleErrorMessage: generateFallbackErrorMessage(fallback, DEFAULT_CONFIG.fallback)
    });
  });
  validRatings.forEach(rating => {
    configs.push({
      in: { rating },
      out: { rating: rating.toLowerCase() },
      consoleErrorMessage: generateRatingErrorMessage(rating, DEFAULT_CONFIG.rating)
    });
  });
  return configs;
}

function generateFallbackErrorMessage(fallback, defaultFallback) {
  return `[ngx-gravatar] - "${fallback}" is invalid gravatar fallback type. ` + `Default fallback "${defaultFallback}" is used.`;
}

function generateRatingErrorMessage(rating, defaultRating) {
  return `[ngx-gravatar] - "${rating}" is invalid gravatar rating type. ` + `Default rating "${defaultRating}" is used.`;
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
    gravatarService = TestBed.inject(NgxGravatarService);
    spyOn(console, 'error');
  });

  it('should be created', inject([NgxGravatarService], (service: NgxGravatarService) => {
    expect(service).toBeTruthy();
  }));

  it(`#getDefaultConfig() should return DEFAULT_CONFIG object`, () => {
    expect(gravatarService.getDefaultConfig()).toEqual(DEFAULT_CONFIG);
  });

  it(`#generateGravatarUrl('toan.hmt@gmail.com') should return url with default size, rating, fallback`, () => {
    expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com')).toEqual(
      `https://www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8` +
        `?s=${gravatarService.getDefaultConfig().size}` +
        `&r=${gravatarService.getDefaultConfig().rating}` +
        `&d=${gravatarService.getDefaultConfig().fallback}`
    );
  });

  it(`#generateGravatarUrl(null, '0a2aaae0ac1310d1f8e8e68df45fe7b8') should return url with default size, rating, fallback`, () => {
    expect(gravatarService.generateGravatarUrl(null, '0a2aaae0ac1310d1f8e8e68df45fe7b8')).toEqual(
      `https://www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8` +
        `?s=${gravatarService.getDefaultConfig().size}` +
        `&r=${gravatarService.getDefaultConfig().rating}` +
        `&d=${gravatarService.getDefaultConfig().fallback}`
    );
  });

  notStrings.forEach(notString => {
    it(`#generateGravatarUrl(${notString}) should return url with default hash, size, rating, fallback and PRINT error message`, () => {
      expect(gravatarService.generateGravatarUrl(notString)).toEqual(
        `https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e` +
          `?s=${gravatarService.getDefaultConfig().size}` +
          `&r=${gravatarService.getDefaultConfig().rating}` +
          `&d=${gravatarService.getDefaultConfig().fallback}`
      );
      expect(console.error).toHaveBeenCalledWith(generateEmailErrorMessage(notString));
    });
  });

  it(
    `#generateGravatarUrl('toan.hmt@gmail.com', null, 150)` + `should return url with default rating, fallback and NOT PRINT error message`,
    () => {
      expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', null, 150)).toEqual(
        `https://www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=150` +
          `&r=${gravatarService.getDefaultConfig().rating}` +
          `&d=${gravatarService.getDefaultConfig().fallback}`
      );
      expect(console.error).not.toHaveBeenCalledWith(generateEmailErrorMessage('toan.hmt@gmail.com'));
    }
  );

  validRatings.forEach(rating => {
    const stmt =
      `#generateGravatarUrl('toan.hmt@gmail.com', null, 150, '${rating}') ` +
      `should return url with lowercase rating, default fallback and NOT PRINT error message`;
    it(stmt, () => {
      expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', null, 150, rating)).toEqual(
        `https://www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=150` +
          `&r=${rating.toLowerCase()}` +
          `&d=${gravatarService.getDefaultConfig().fallback}`
      );
      expect(console.error).not.toHaveBeenCalledWith(generateRatingErrorMessage(rating, gravatarService.getDefaultConfig().rating));
    });
  });

  it(
    `#generateGravatarUrl('toan.hmt@gmail.com', null, 380, undefined) ` +
      `should return url with default rating, fallback and NOT PRINT error message`,
    () => {
      expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', null, 380, undefined)).toEqual(
        `https://www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=380` +
          `&r=${gravatarService.getDefaultConfig().rating}` +
          `&d=${gravatarService.getDefaultConfig().fallback}`
      );
      expect(console.error).not.toHaveBeenCalledWith(generateRatingErrorMessage(undefined, gravatarService.getDefaultConfig().rating));
    }
  );

  validFallbacks.forEach(fallback => {
    const statment =
      `#generateGravatarUrl('toan.hmt@gmail.com', null, 50, 'pg', '${fallback}') ` +
      `should return specified parameters and NOT PRINT error message`;
    it(statment, () => {
      expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', null, 50, 'pg', fallback)).toEqual(
        `https://www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=50&r=pg&d=${fallback}`
      );
      expect(console.error).not.toHaveBeenCalledWith(generateFallbackErrorMessage(fallback, gravatarService.getDefaultConfig().fallback));
    });
  });

  it(
    `#generateGravatarUrl('toan.hmt@gmail.com', null, 380, 'pg', undefined) ` +
      `should return url with default fallback and NOT PRINT error message`,
    () => {
      expect(gravatarService.generateGravatarUrl('toan.hmt@gmail.com', null, 380, 'pg', undefined)).toEqual(
        `https://www.gravatar.com/avatar/0a2aaae0ac1310d1f8e8e68df45fe7b8?s=380&r=pg` + `&d=${gravatarService.getDefaultConfig().fallback}`
      );
      expect(console.error).not.toHaveBeenCalledWith(generateFallbackErrorMessage(undefined, gravatarService.getDefaultConfig().fallback));
    }
  );
});

describe('NgxGravatarService with custom configuration', () => {
  function setup(gravatarConfig: GravatarConfig) {
    TestBed.configureTestingModule({
      imports: [GravatarModule.forRoot(gravatarConfig)],
      providers: [NgxGravatarService]
    });
    spyOn(console, 'error');
    return TestBed.inject(NgxGravatarService);
  }

  validCustomConfigs.forEach(config => {
    const stmt =
      `With forRoot(${JSON.stringify(config.in)}), ` +
      `#getDefaultConfig should return an object contains ${JSON.stringify(config.out)} ` +
      `and NOT print error message`;
    it(stmt, () => {
      const gravatarService = setup(config.in);
      expect(gravatarService.getDefaultConfig()).toEqual(jasmine.objectContaining(config.out));
      expect(console.error).not.toHaveBeenCalledWith(config.consoleErrorMessage);
    });
  });
});
