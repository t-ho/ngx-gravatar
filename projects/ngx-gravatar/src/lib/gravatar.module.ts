import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgxGravatarService } from './ngx-gravatar.service';
import { GravatarConfig } from './gravatar-config';
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
  static forRoot(gravatarConfig: GravatarConfig): ModuleWithProviders {
    return {
      ngModule: GravatarModule,
      providers: [
        {
          provide: 'gravatarDefault.config',
          useValue: gravatarConfig
        }
      ]
    };
  }
}
