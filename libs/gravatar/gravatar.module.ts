import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgxGravatarService } from './ngx-gravatar.service';
import { GravatarDefaultConfig } from './gravatar-default-config';
import { NgxGravatarDirective } from './ngx-gravatar.directive';

@NgModule({
	declarations: [
		NgxGravatarDirective
	],
	exports: [
		NgxGravatarDirective
	],
	providers: [
		NgxGravatarService
	]
})
export class GravatarModule {
	static forRoot(gravatarDefaultConfig: GravatarDefaultConfig): ModuleWithProviders {
		return {
			ngModule: GravatarModule,
			providers: [
				{
					provide: 'gravatarDefault.config',
					useValue: gravatarDefaultConfig
				}
			]
		}
	}
}
