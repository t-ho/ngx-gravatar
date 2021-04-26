import { GravatarConfig } from './gravatar-config';
import { FALLBACK, RATING } from './ngx-gravatar.enums';

export const DEFAULT_CONFIG: GravatarConfig = {
  fallback: FALLBACK.retro,
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
  rating: RATING.g,
  ratio: 2,
};
