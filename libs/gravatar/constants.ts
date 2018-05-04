import { GravatarDefaultConfig } from './gravatar-default-config';

export const FALLBACK_TYPES = {
  blank: 'blank',
  indenticon: 'identicon',
  mm: 'mm',
  monsterid: 'monsterid',
  retro: 'retro',
  robohash: 'robohash',
  wavatar: 'wavatar'
};

export const DEFAULT_CONFIG: GravatarDefaultConfig = {
  fallback: 'retro',
  size: 40,
  cornerRadius: 0,
  preferGravatar: false,
  hasBorder: false,
  borderColor: '#000000',
  borderRadius: '50%',
  borderStyle: 'solid',
  borderWidth: 1,
  round: true,
};
