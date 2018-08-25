import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { GravatarConfig } from './gravatar-config';
import { GRAVATAR_CONFIG_TOKEN } from './gravatar-config.token';
import { DEFAULT_CONFIG } from './ngx-gravatar.constants';
import { FALLBACK, FallbackType, RATING, RatingType } from './ngx-gravatar.enums';

@Injectable()
export class NgxGravatarService {

  private defaultConfig: GravatarConfig;

  constructor(@Optional() @Inject(GRAVATAR_CONFIG_TOKEN) private gravatarConfig: GravatarConfig) {
    this.defaultConfig = { ...DEFAULT_CONFIG };

    if (this.gravatarConfig) {
      this.gravatarConfig.rating = <RatingType>this.determineRating(this.gravatarConfig.rating);
      this.gravatarConfig.fallback = <FallbackType>this.determineFallback(this.gravatarConfig.fallback);
      this.defaultConfig = { ...this.defaultConfig, ...this.gravatarConfig };
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
    try {
      email = email.trim().toLowerCase();
    } catch (e) {
      // Complain email is not a string
      console.error(`[ngx-gravatar] - Email (${email}) is not a string. Empty string is used as a default email.`);
      email = '';
    }
    size = size ? size : this.defaultConfig.size;
    rating = this.determineRating(rating, this.defaultConfig.rating);
    fallback = this.determineFallback(fallback, this.defaultConfig.fallback);
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
    if (fallback === undefined) {
      return defaultFallback;
    }

    if (FALLBACK[fallback] === undefined) {
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
    if (rating === undefined) {
      return defaultRating;
    }

    if (RATING[rating] === undefined) {
      console.error(`[ngx-gravatar] - "${rating}" is invalid gravatar rating type. ` +
        `Default rating "${defaultRating}" is used.`);
      return defaultRating;
    }

    return rating;
  }
}
