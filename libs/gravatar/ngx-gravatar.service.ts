import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import * as _ from 'lodash';
import { GravatarDefaultConfig } from './gravatar-default-config';
import { DEFAULT_CONFIG, FALLBACK_TYPES } from './constants';

@Injectable()
export class NgxGravatarService {

  private defaultConfig: GravatarDefaultConfig;

  constructor(@Optional() @Inject('gravatarDefault.config') private gravatarConfig: GravatarDefaultConfig) {
    this.defaultConfig = DEFAULT_CONFIG;

    if (this.gravatarConfig) {
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
   * @param email string
   * @param size number
   * @param fallback string
   */
  generateGravatarUrl(email: string, size: number, fallback: string) {
    // Complain email is not a string
    if (!_.isString(email)) {
      email = '';
      console.error('[ngx-gravatar] - Email is not a string');
    }
    email = email.trim().toLowerCase();
    const emailHash = Md5.hashStr(email);
    return `//www.gravatar.com/avatar/${emailHash}?s=${size}&d=${fallback}`;
  }

  /**
   * Validate gravatar fallback string
   * @param fallback string
   */
  validateFallback(fallback: string) {
    if (_.findKey(FALLBACK_TYPES, (v) => fallback === v) === undefined) {
      // Complain invalid fallback
      console.error(`[ngx-gravatar] - "${fallback}" is invalid gravatar fallback.`);
      return false;
    }
    return true;
  }
}
