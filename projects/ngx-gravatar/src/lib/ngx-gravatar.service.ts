import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Md5 } from 'ts-md5';
import { GravatarConfig } from './gravatar-config';
import { GRAVATAR_CONFIG_TOKEN } from './gravatar-config.token';
import { DEFAULT_CONFIG } from './ngx-gravatar.constants';

@Injectable({
  providedIn: 'root'
})
export class NgxGravatarService {
  private defaultConfig: GravatarConfig;

  constructor(@Optional() @Inject(GRAVATAR_CONFIG_TOKEN) private gravatarConfig: GravatarConfig) {
    this.defaultConfig = { ...DEFAULT_CONFIG };

    if (this.gravatarConfig) {
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
   * @param md5Hash is a string. If value is given it will take precedence over email.
   * @param size number
   * @param rating string
   * @param fallback string
   * @return gravatar url
   */
  generateGravatarUrl(
    email: string,
    md5Hash?: string,
    size: number = this.defaultConfig.size,
    rating: string = this.defaultConfig.rating,
    fallback: string = this.defaultConfig.fallback
  ) {
    let emailHash: string | Int32Array;
    if (md5Hash) {
      emailHash = md5Hash;
    } else {
      try {
        email = email.trim().toLowerCase();
      } catch (e) {
        console.error(`[ngx-gravatar] - Email (${email}) is not a string. Empty string is used as a default email.`);
        email = '';
      }
      emailHash = Md5.hashStr(email);
    }
    return `https://www.gravatar.com/avatar/${emailHash}?s=${size}&r=${rating}&d=${fallback}`;
  }
}
