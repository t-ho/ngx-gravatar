import { InjectionToken } from '@angular/core';
import { GravatarConfig } from './gravatar-config';

/**
 * Injection token for gravatar configuration
 */
export const GRAVATAR_CONFIG_TOKEN = new InjectionToken<GravatarConfig>('gravatarDefault.config');
