import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { NgxGravatarService } from './ngx-gravatar.service';
import { GravatarConfig } from './gravatar-config';

@Directive({
  selector: '[ngx-gravatar], [ngxGravatar]'
})
export class NgxGravatarDirective implements OnChanges, OnInit {
  @Input() src: string;
  @Input() email: string;
  @Input() md5Hash: string;
  @Input() size: number;
  @Input() fallback: string; // enum: ['blank', 'identicon', 'mm', 'monsterid', 'retro', 'robohash', 'wavatar']
  @Input() rating: string; // enum: ['g', 'pg', 'r', 'x']
  @Input() round: boolean;
  @Input() cornerRadius: number;
  @Input() borderColor: string;
  @Input() borderWidth: number;
  @Input() style: any = {};
  @Input() preferGravatar: boolean;
  @Input() backgroundColor: boolean;
  @Input() ratio: number;

  initialized: boolean;
  defaultConfig: GravatarConfig;
  requestedSize: number;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private gravatarService: NgxGravatarService,
  ) {
    this.initialized = false;
    this.defaultConfig = this.gravatarService.getDefaultConfig();
    // Listen for error when fetching custom src
    this.renderer.listen(this.elementRef.nativeElement, 'error', (event) => {
      this.initializeAvatar(true); // Force using gravatar
    });
  }

  ngOnInit() {
    this.initializeAvatar();
    this.initialized = true;
  }

  ngOnChanges() {
    if (this.initialized) {
      this.initializeAvatar();
    }
  }

  /**
   * Set default values for user inputs if they are not provided
   */
  private setDefaultValues() {
    this.size = this.computeSize();
    this.ratio = this.ratio === undefined ? this.defaultConfig.ratio : this.ratio;
    this.requestedSize = this.size * this.ratio;
    this.round = this.round === undefined ? this.defaultConfig.round : this.round;
    this.cornerRadius = this.cornerRadius === undefined ? this.defaultConfig.cornerRadius : this.cornerRadius;
    this.preferGravatar = this.preferGravatar === undefined ? this.defaultConfig.preferGravatar : this.preferGravatar;
  }

  /**
   * Initialize avatar.
   * Custom source has higher priority if preferGravatar is not set on.
   * Finally, set styles for the avatar.
   */
  private initializeAvatar(forcedGravatar?: boolean) {
    this.setDefaultValues();
    let url = '';
    if (this.preferGravatar || forcedGravatar) {
      url = this.gravatarService.generateGravatarUrl(this.email, this.md5Hash, this.requestedSize, this.rating, this.fallback);
    } else { // this.preferGravatar == false
      if (this.src) {
        url = this.src;
      } else { // fallback to gravatar
        url = this.gravatarService.generateGravatarUrl(this.email, this.md5Hash, this.requestedSize, this.rating, this.fallback);
      }
    }
    this.renderer.setProperty(this.elementRef.nativeElement, 'src', url);
    this.setStyle(this.avatarStyle());
  }

  /**
   * Compute the size of the avatar
   * @return size
   */
  private computeSize(): number {
    let size = this.size === undefined ? this.defaultConfig.size : this.size;
    if (this.style && this.style.width) {
      try {
        const width = this.style.width.trim();
        if (width.match(/^\d+px$/)) { // width with px unit
          size = width.replace('px', '');
        }
      } catch (e) {
        return size;
      }
    }
    return size;
  }

  /**
   * Compute style object
   * @return style object
   */
  private avatarStyle() {
    const style = {
      width: this.size + 'px',
      height: this.size + 'px',
      borderRadius: this.round ? this.defaultConfig.borderRadius : this.cornerRadius + 'px',
      borderStyle: this.defaultConfig.hasBorder || this.borderColor || this.borderWidth ? this.defaultConfig.borderStyle : 'none',
      borderColor: this.borderColor ? this.borderColor : this.defaultConfig.borderColor,
      borderWidth: this.borderWidth ? this.borderWidth + 'px' : this.defaultConfig.borderWidth + 'px',
      backgroundColor: this.backgroundColor ? this.backgroundColor : this.defaultConfig.backgroundColor,
    };
    return { ...style, ...this.style };
  }

  /**
   * Set style for the avatar
   * @param styles style object
   */
  private setStyle(styles: any) {
    Object.keys(styles).forEach(key => {
      this.renderer.setStyle(this.elementRef.nativeElement, key, styles[key]);
    });
  }
}
