// Visit https://en.gravatar.com/site/implement/images for more information
export enum FALLBACK {
  blank = 'blank',
  indenticon = 'identicon',
  mm = 'mm',
  monsterid = 'monsterid',
  retro = 'retro',
  robohash = 'robohash',
  wavatar = 'wavatar'
}

export enum RATING {
  g = 'g',
  pg = 'pg',
  r = 'r',
  x = 'x'
}

export type FallbackType = keyof typeof FALLBACK;

export type RatingType = keyof typeof RATING;
