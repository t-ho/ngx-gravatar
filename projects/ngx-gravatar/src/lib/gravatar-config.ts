import { FallbackType, RatingType } from "./ngx-gravatar.enums";

export interface GravatarConfig {
  fallback?: FallbackType;
  fallbackUrl?: string;
  size?: number;
  cornerRadius?: number;
  preferGravatar?: boolean;
  hasBorder?: boolean;
  borderColor?: string;
  borderRadius?: string;
  borderStyle?: string;
  borderWidth?: number;
  round?: boolean;
  backgroundColor?: string;
  rating?: RatingType;
  ratio?: number;
}
