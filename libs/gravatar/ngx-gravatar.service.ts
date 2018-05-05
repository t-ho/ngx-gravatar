import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import * as _ from 'lodash';
import { GravatarDefaultConfig } from './gravatar-default-config';
import { DEFAULT_CONFIG, FALLBACK_TYPES, RATING_TYPES } from './ngx-gravatar.constants';

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
   * @param email is a string. If email is not a string, email will be set to empty string "" by default
   * @param size number
   * @param rating string
   * @param fallback string
   * @return gravatar url
   */
  generateGravatarUrl(email: string, size?: number, rating?: string, fallback?: string) {
    // Complain email is not a string
    if (!_.isString(email)) {
      console.error(`[ngx-gravatar] - Email (${email}) is not a string. Empty string is used as a default email.`);
      email = '';
    }
    size = size ? size : this.defaultConfig.size;
    rating = this.determineRating(rating, this.defaultConfig.rating);
    fallback = this.determineFallback(fallback, this.defaultConfig.fallback);
    email = email.trim().toLowerCase();
    const emailHash = Md5.hashStr(email);
    return `//www.gravatar.com/avatar/${emailHash}?s=${size}&r=${rating}&d=${fallback}`;
  }

  /**
   * Determine gravatar fallback string
   * @param fallback string
   * @param defaultFallback string
   * @return
   */
  private determineFallback(fallback: string, defaultFallback: string = DEFAULT_CONFIG.fallback) {
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
   * @param rating string
   * @param defaultRating string
   * @return
   */
  private determineRating(rating: string, defaultRating: string = DEFAULT_CONFIG.rating) {
    defaultRating = defaultRating.toLowerCase();
    if (_.isUndefined(rating)) {
      return defaultRating;
    }

    const isString = _.isString(rating);

    if (!isString || (isString && _.findKey(RATING_TYPES, (v) => rating.toLowerCase() === v) === undefined)) {
      console.error(`[ngx-gravatar] - "${rating}" is invalid gravatar rating type. ` +
        `Default rating "${defaultRating}" is used.`);
      return defaultRating;
    }

    return rating.toLowerCase();
  }
}
