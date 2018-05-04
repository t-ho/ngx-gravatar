import { GravatarDefaultConfig } from './gravatar-default-config';

// Visit https://en.gravatar.com/site/implement/images for more information
export const FALLBACK_TYPES = {
  blank: 'blank',
  indenticon: 'identicon',
  mm: 'mm',
  monsterid: 'monsterid',
  retro: 'retro',
  robohash: 'robohash',
  wavatar: 'wavatar'
};

export const RATING_TYPES = {
  g: 'g',
  pg: 'pg',
  r: 'r',
  x: 'x'
}

export const DEFAULT_CONFIG: GravatarDefaultConfig = {
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
