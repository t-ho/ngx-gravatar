import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import * as _ from 'lodash';

const FALLBACKS: string[] = ['blank', 'identicon', 'mm', 'monsterid', 'retro', 'robohash', 'wavatar'];

@Directive({
	selector: '[ngx-gravatar]'
})
export class NgxGravatarDirective implements OnChanges, OnInit {
	@Input('src') custom: string;
	@Input('email') email: string;
	@Input('size') size: number = 40;
	@Input('fallback') fallback: string = 'retro'; // enum: ['blank', 'identicon', 'mm', 'monsterid', 'retro', 'robohash', 'wavatar']
	@Input('round') round: boolean = true;
	@Input('cornerRadius') cornerRadius: number = 0;
	@Input('borderColor') borderColor: string;
	@Input('borderWidth') borderWidth: number;
	@Input('style') style: any = {};
	@Input('preferGravatar') preferGravatar: boolean = false;

	constructor(
		private elementRef: ElementRef,
		private renderer: Renderer2,
	) {
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
	 * Initialize avatar.
	 * Complain if provided gravatar fallback is invalid.
	 * Custom source has higher priority if preferGravatar is not set on.
	 * Finally, set styles for the avatar.
	 */
	private _initializeAvatar(forcedGravatar?: boolean) {
		// Complain invalid fallback
		if(_.indexOf(FALLBACKS, this.fallback) == -1) {
			console.error(`[ngx-gravatar] - Invalid fallback. Fallback's possible values: ${FALLBACKS}`);
		}
		let url = '';
		if(this.preferGravatar || forcedGravatar) {
			url = this._generateGravatarUrl();
		} else { // this.preferGravatar == false
			if(this.custom) {
				url = this.custom;
			} else { // fallback to gravatar
				url = this._generateGravatarUrl();
			}
		}
		this.renderer.setProperty(this.elementRef.nativeElement, 'src', url);
		this._setStyle(this._avatarStyle());
	}

	/**
	 * Generate gravatar url
	 */
	private _generateGravatarUrl() {
		// Complain email is not a string
		if(!_.isString(this.email)) {
			this.email = '';
			console.error('[ngx-gravatar] - Email is not a string');
		}
		this.email = this.email.trim().toLowerCase();
		const emailHash = Md5.hashStr(this.email);
		return `//www.gravatar.com/avatar/${emailHash}?s=${this.size}&d=${this.fallback}`;
	}

	/**
	 * Compute style object
	 */
	private _avatarStyle() {
		let style = {
			width: this.size + 'px',
			height: this.size + 'px',
			borderRadius: this.round ? '50%' : this.cornerRadius + 'px',
			borderStyle: this.borderColor || this.borderWidth ? 'solid' : 'none',
			borderColor: this.borderColor ? this.borderColor : '',
			borderWidth: this.borderWidth ? this.borderWidth + 'px' : '1px',
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