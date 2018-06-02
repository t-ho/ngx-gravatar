import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import * as _ from 'lodash';
import { NgxGravatarService } from './ngx-gravatar.service';

@Directive({
  selector: '[ngx-gravatar], [ngxGravatar]'
})
export class NgxGravatarDirective implements OnChanges, OnInit {
  @Input() src: string;
  @Input() email: string;
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

  initialized: boolean;
  defaultConfig: any;

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
    this.round = _.isUndefined(this.round) ? this.defaultConfig.round : this.round;
    this.cornerRadius = _.isUndefined(this.cornerRadius) ? this.defaultConfig.cornerRadius : this.cornerRadius;
    this.preferGravatar = _.isUndefined(this.preferGravatar) ? this.defaultConfig.preferGravatar : this.preferGravatar;
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
      url = this.gravatarService.generateGravatarUrl(this.email, this.size, this.rating, this.fallback);
    } else { // this.preferGravatar == false
      if (this.src) {
        url = this.src;
      } else { // fallback to gravatar
        url = this.gravatarService.generateGravatarUrl(this.email, this.size, this.rating, this.fallback);
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
    let size = _.isUndefined(this.size) ? this.defaultConfig.size : this.size;
    if (this.style && _.isString(this.style.width)) {
      const width = this.style.width.trim();
      if (width.match(/^\d+px$/)) { // width with px unit
        size = width.replace('px', '');
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
    return _.merge(style, this.style);
  }

  /**
   * Set style for the avatar
   * @param styles style object
   */
  private setStyle(styles: any) {
    _.forEach(styles, (v, k) => {
      this.renderer.setStyle(this.elementRef.nativeElement, k, v);
    });
  }
}
