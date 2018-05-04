import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import * as _ from 'lodash';
import { NgxGravatarService } from './ngx-gravatar.service';

@Directive({
	selector: '[ngx-gravatar]'
})
export class NgxGravatarDirective implements OnChanges, OnInit {
	@Input('src') custom: string;
	@Input('email') email: string;
	@Input('size') size: number;
	@Input('fallback') fallback: string; // enum: ['blank', 'identicon', 'mm', 'monsterid', 'retro', 'robohash', 'wavatar']
	@Input('round') round: boolean;
	@Input('cornerRadius') cornerRadius: number;
	@Input('borderColor') borderColor: string;
	@Input('borderWidth') borderWidth: number;
	@Input('style') style: any = {};
	@Input('preferGravatar') preferGravatar: boolean;

	defaultConfig: any;

	constructor(
		private elementRef: ElementRef,
		private renderer: Renderer2,
		private gravatarService: NgxGravatarService,
	) {
		this.defaultConfig = this.gravatarService.getDefaultConfig();
		// Listen for error when fetching custom src
		this.renderer.listen(this.elementRef.nativeElement, 'error', (event) => {
			this._initializeAvatar(true); // Force using gravatar
		});
	}

	ngOnInit() {
		this._initializeAvatar();
	}

	ngOnChanges() {
		this._initializeAvatar();
	}

	/**
	 * Set default values for user inputs if they are not provided
	 */
	private _setDefaultValues() {
		this.size = this._computeSize();
		this.round = _.isUndefined(this.round) ? this.defaultConfig.round : this.round;
		this.fallback = _.isUndefined(this.fallback) ? this.defaultConfig.fallback : this.gravatarService.validateFallback(this.fallback) ? this.fallback : this.defaultConfig.fallback;
		this.cornerRadius = _.isUndefined(this.cornerRadius) ? this.defaultConfig.cornerRadius : this.cornerRadius;
		this.preferGravatar = _.isUndefined(this.preferGravatar) ? this.defaultConfig.preferGravatar : this.preferGravatar;
	}

	/**
	 * Initialize avatar.
	 * Custom source has higher priority if preferGravatar is not set on.
	 * Finally, set styles for the avatar.
	 */
	private _initializeAvatar(forcedGravatar?: boolean) {
		this._setDefaultValues();
		let url = '';
		if (this.preferGravatar || forcedGravatar) {
			url = this.gravatarService.generateGravatarUrl(this.email, this.size, this.fallback);
		} else { // this.preferGravatar == false
			if (this.custom) {
				url = this.custom;
			} else { // fallback to gravatar
				url = this.gravatarService.generateGravatarUrl(this.email, this.size, this.fallback);
			}
		}
		this.renderer.setProperty(this.elementRef.nativeElement, 'src', url);
		this._setStyle(this._avatarStyle());
	}

	/**
	 * Compute the size of the avatar
	 * @return size
	 */
	private _computeSize(): number {
		let size = _.isUndefined(this.size) ? this.defaultConfig.size : this.size;
		if (this.style && _.isString(this.style.width)) {
			let width = this.style.width.trim();
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
	private _avatarStyle() {
		let style = {
			width: this.size + 'px',
			height: this.size + 'px',
			borderRadius: this.round ? this.defaultConfig.borderRadius : this.cornerRadius + 'px',
			borderStyle: this.defaultConfig.hasBorder || this.borderColor || this.borderWidth ? this.defaultConfig.borderStyle : 'none',
			borderColor: this.borderColor ? this.borderColor : this.defaultConfig.borderColor,
			borderWidth: this.borderWidth ? this.borderWidth + 'px' : this.defaultConfig.borderWidth + 'px',
		}
		return _.merge(style, this.style);
	}

	/**
	 * Set style for the avatar
	 * @param styles style object
	 */
	private _setStyle(styles: any) {
		_.forEach(styles, (v, k) => {
			this.renderer.setStyle(this.elementRef.nativeElement, k, v);
		});
	}
}