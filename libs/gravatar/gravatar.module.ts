import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxGravatarDirective } from './ngx-gravatar.directive';

import { } from './'

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		NgxGravatarDirective
	],
	exports: [
		NgxGravatarDirective
	]
})
export class GravatarModule { }
