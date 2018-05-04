import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import * as _ from 'lodash';
import { GravatarDefaultConfig } from './gravatar-default-config';
import { DEFAULT_CONFIG, FALLBACK_TYPES, RATING_TYPES } from './constants';

@Injectable()
export class NgxGravatarService {

  private defaultConfig: GravatarDefaultConfig;

  constructor(@Optional() @Inject('gravatarDefault.config') private gravatarConfig: GravatarDefaultConfig) {
    this.defaultConfig = DEFAULT_CONFIG;

    if (this.gravatarConfig) {
      this.gravatarConfig.rating = this.determineRating(this.gravatarConfig.rating);
      this.gravatarConfig.fallback = this.determineFallback(this.gravatarConfig.fallback);
      this.defaultConfig = _.merge(this.defaultConfig, this.gravatarConfig);
    }
  }

  /**
   * Return defaultConfig object
   */
  getDefaultConfig() {
    return this.defaultConfig;
  }

  /**
   * Generate gravatar url
   * @param {string} email
   * @param {number} size
   * @param {string} rating 
   * @param {string} fallback
   */
  generateGravatarUrl(email: string, size: number, rating: string, fallback: string) {
    // Complain email is not a string
    if (!_.isString(email)) {
      console.error(`[ngx-gravatar] - Email (${email}) is not a string. Empty string is used as a default email.`);
      email = '';
    }
    email = email.trim().toLowerCase();
    const emailHash = Md5.hashStr(email);
    return `//www.gravatar.com/avatar/${emailHash}?s=${size}&r=${rating}&d=${fallback}`;
  }

  /**
   * Determine gravatar fallback string
   * @param {string} fallback string
   * @param {string} defaultFallback string
   * @return {string}
   */
  determineFallback(fallback: string, defaultFallback: string = DEFAULT_CONFIG.fallback, internal: boolean = true) {
    if (_.isUndefined(fallback)) {
      return defaultFallback;
    }

    if (_.findKey(FALLBACK_TYPES, (v) => fallback === v) === undefined) {
      // Complain invalid fallback
      console.error(`[ngx-gravatar] - "${fallback}" is invalid gravatar fallback type. ` +
        `Default fallback "${defaultFallback}" is used.`);
      return defaultFallback;
    }

    return fallback;
  }

  /**
   * Determine gravatar rating string
   * @param {string} rating string
   * @param {string} defaultRating string
   * @return {bolean}
   */
  determineRating(rating: string, defaultRating: string = DEFAULT_CONFIG.rating) {
    if (_.isUndefined(rating)) {
      return defaultRating;
    }

    if (_.findKey(RATING_TYPES, (v) => rating === v) === undefined) {
      // Complain invalid rating 
      console.error(`[ngx-gravatar] - "${rating}" is invalid gravatar rating type.` +
        `Default rating "${defaultRating}" is used.`);
      return defaultRating;
    }

    return rating;
  }
}
